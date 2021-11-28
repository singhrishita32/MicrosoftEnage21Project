import { React, Component } from 'react'
import { Redirect,Link } from 'react-router-dom'
import { SigninAdmin } from './api'
import {authenticate} from '../Auth/api'
class  AdminLogin extends Component {
    constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToAdminDashboard: false,
            loading: false
        }
    }
    handleChange = (str) => (event) => {
        this.setState({ error: "" });
        this.setState({
            [str]: event.target.value
        });
    };

    

    clickSubmit = (event) => {
        event.preventDefault();
        this.setState({loading:true})
        const {email,password} = this.state
        const admin = {
            email: email,
            password: password
        };
        
        
        SigninAdmin(admin)
            .then((data) => {
                if (data.error) {
                    this.setState({ error: data.error,loading:false })
                }
                else {
                    authenticate(data, () => {
                        this.setState({ redirectToAdminDashboard: true, loading: false })
                        
                    })
                }
            });
    };
    signinForm = (email, password) => (
        <form>
                <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input 
                            onChange = {this.handleChange("email")} 
                            type = "email" 
                            className = "form-control"
                            value = {email}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input 
                            onChange = {this.handleChange("password")} 
                            type = "password" 
                            className = "form-control"
                            value = {password}>
                        </input>   
                    </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
            <Link  className="btn btn-raised btn-primary" style={{marginLeft:"5%"}} to="/"> Back</Link>
                </form>
          
    )
    render() {
        const {email, password, error,redirectToAdminDashboard,loading} = this.state;
        if (redirectToAdminDashboard) {
           return <Redirect to="/admindashboard"></Redirect>
        }
        
        return (
            <div>
                <div className="jumbotron">
                        <h3 className="font-weight-bold">Jaypee Institute Of Information Technology</h3>
                        <h4>Hub Portal</h4>
                </div>    
                <div className="container">
                    <h2 className="mt-5 mb-5">Admin SignIn</h2>

                    <div className="alert alert-danger" style={{display:error?"":"NONE"}}>
                        {error}
                    </div>
                    {loading ? (
                        <div className="jumbotron text-center">
                            <h2>Loading...</h2>
                            </div>
                    ) : (
                            ""
                    )}
                    {this.signinForm(email,password)}    
                </div>
                
            </div>
        );
    };
}
export default AdminLogin;