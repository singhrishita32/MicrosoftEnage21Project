import React, { Component } from 'react'
import { allStudents,studentSignup } from '../Student/api'
import { Link } from 'react-router-dom'
import { load, addHub } from '../HW/api'
import{isAuthenticated} from '../Auth/api'
class AdminDashboard extends Component {
    constructor() {
        super()
        this.state = {
            addStudent: false,
            addHub: false,
            addCoordinator: false,
            viewStudents: false,
            viewHubs: false,
            viewCoordinators: false,
            loading: false,
            name: "",
            email: "",
            enroll: "",
            message: "",
            error: "",
            hubs: "",
            arr: [],
            students: ""
            
        }
    }
    componentDidMount = () => {
        this.setState({ loading: true })
        load()
            .then((data => {
                this.setState({ hubs: data, arr: new Array(data.length).fill(0) })
            })
            )
            allStudents()
            .then((data => {
                this.setState({ students: data})
            })
            )
        this.setState({ loading: false })
    }
    //to update state variables
    handleChange = (str) => (event) => {
        this.setState({ error: "" ,msg:""});
        this.setState({
            [str]: event.target.value
        });
    };

    //function to signup student 
    signupStudent = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const { email, name, enroll, arr, hubs, addCoordinator } = this.state
        var hubscoordinating = new Array();
        if (addCoordinator)
        {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]) {
                    var obj = {
                        id: hubs[i]._id,
                        name:hubs[i].name
                    }
                    hubscoordinating.push(obj)                  
                }
                
            }
        }
        const student = {
            email: email,
            name: name,
            enroll: enroll,
            hubscoordinating:hubscoordinating
        };
        if (name === "" || enroll === "" || email === ""  || (addCoordinator && hubscoordinating.length===0))
        {
            this.setState({ loading:false,error: "Please fill all fields" })
            return;
        }

        
        studentSignup(student)
            .then(data => {

                if (data.error) {
                    this.setState({ error: data.error, loading: false })
                }
                else {
                    
                    this.setState({ loading: false, message: 'Added!', name: "", enroll: "", email: "" })
                    window.location.reload();
                }
            });
    };
    
    //signup form to create student account
    studentForm = (name, enroll, email) => (
        
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="name"
                    className="form-control"
                    value={name}>
                </input>
            </div>
            <div className="form-group">
                <label className="text-muted">Enrollment Number</label>
                <input
                    onChange={this.handleChange("enroll")}
                    type="enrol;"
                    className="form-control"
                    value={enroll}>
                </input>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}>
                </input>
            </div>
                    
            <button onClick={this.signupStudent} className="btn btn-raised btn-primary">Submit</button>
        </form>
        
    )

    handleHubs = (str) => (event) => {
        var x = this.state.arr;
        x[str]=!x[str]
        this.setState({ error: "" });
        this.setState({
            arr: x
        });
    
    };

    //select hubs while assigning them to hub
    selectHubs = (hubs) => (
        hubs.map((hub, i) => {
            return (
                <>
                    <label className="text-muted">{hub.name}</label>
                    <input
                        onChange={this.handleHubs(i)}
                        type="checkbox"
                        className="form-control"
                        checked={this.state.arr[i]}
                    />       
                </>
            )
        })
    )
    //to create hub
    createHub = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        if (this.state.name === "")
        {
            this.setState({ loading:false,error: "Please fill all fields" })
            return;
        }
        var hub = {
            name: this.state.name
        }
        addHub(hub)
            .then(data => {
                if (data.error) 
                    this.setState({ error: data.error, loading: false })                
                else {
                    this.setState({ loading: false, message: "Added!" })
                    window.location.reload();
                }
            });
    }
    hubForm = (name) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="name"
                    className="form-control"
                    value={name}>
                </input>
            </div>
            <button onClick={this.createHub} className="btn btn-raised btn-primary">Submit</button>
        </form>
    )

    display = (arr) => (
        arr.map((element, i) => {
            return (
            <>
                    {this.state.viewHubs && 
                        <div className="card col-md-4 mt-5" key={i}>
                            <h2 className="card-title">{i + 1} . {element.name}</h2>
                            <Link className="btn btn-raised btn-primary"  to={`/workshops/${element._id}`}>Know More</Link>
                        </div>
                    }
                     {( (this.state.viewCoordinators &&  element.hubscoordinating.length>0 ) ||(this.state.viewStudents &&  element.hubscoordinating.length===0 ))&& 
                        <div className="card col-md-4 mt-4" key={i}>
                        <h2 className="card-title">{i + 1} . {element.name}</h2>
                            <p className="card-body" style={{fontSize:"large"}}>
                                Enrollment Number: {element.enroll} <br />
                                Email: {element.email}
                            </p>
                            <Link className="btn btn-raised btn-primary" to={`/student/${element._id}`}>Know More</Link>
                        </div>
                    }
                     
            </>
           )

       }               
   )             
)
    
    render() {
        const {message, error,loading, addStudent, addHub, hubs,addCoordinator, name, enroll, email,viewCoordinators,viewStudents,viewHubs,students } = this.state;
        return (
            <>
                {isAuthenticated().user.type !== "33053ba875f4d3343184292fcbca5bba" ? <div>Not Authorized</div> : (
                    <>
                        <div className="jumbotron"> <h5><strong>ADMIN DASHBOARD</strong></h5> </div>
                        {loading ? <h6>Loading..</h6> : (
                            <>
                                
                                <div >
                                    <button  className="btn btn-raised btn-primary ml-2"  onClick={() => {
                                        this.setState({
                                            addStudent: false,
                                            addHub: false,
                                            addCoordinator: false,
                                            message: "",
                                            viewCoordinators: false,
                                            viewStudents: false,
                                            viewHubs: true,
                                            name: "",
                                            email: "",
                                            enroll:""
                                        })
                                            }}>View Hubs</button>
                                            
                                    <button className="btn btn-raised btn-primary ml-2" onClick={() => {
                                        this.setState({
                                            addStudent: false,
                                            addHub: false,
                                            addCoordinator: false,
                                            message: "",
                                            viewCoordinators: false,
                                            viewStudents: true,
                                            viewHubs: false
                                        })
                                            }}>View Students</button>
                                            
                                    <button className="btn btn-raised btn-primary ml-2" onClick={() => {
                                        this.setState({
                                            addStudent: false,
                                            addHub: false,
                                            addCoordinator: false,
                                            message: "",
                                            viewCoordinators: true,
                                            viewStudents: false,
                                            viewHubs: false
                                        })
                                            }}>View Coordinators</button>
                                            
                                    <button className="btn btn-raised btn-primary ml-2" onClick={() => {
                                        this.setState({
                                            addStudent: true,
                                            addHub: false,
                                            addCoordinator: false,
                                            message: "",
                                            viewCoordinators: false,
                                            viewStudents: false,
                                            viewHubs: false,
                                            name: "",
                                            email: "",
                                            enroll:""
                                        })
                                            }}>Add Student</button>

                                    <button className="btn btn-raised btn-primary ml-2" onClick={() => {
                                        this.setState({
                                            addCoordinator: true,
                                            addStudent: false,
                                            addHub: false,
                                            message: "",
                                            viewCoordinators: false,
                                            viewStudents: false,
                                            viewHubs: false,
                                            name: "",
                                            email: "",
                                            enroll:""
                                        })
                                            }}>Add Coordinator</button>
                                        
                                    <button className="btn btn-raised btn-primary ml-2" onClick={() => {
                                        this.setState({
                                            addHub: true,
                                            addCoordinator: false,
                                            addStudent: false, message: "",
                                            viewCoordinators: false,
                                            viewStudents: false,
                                            viewHubs: false,
                                            name: "",
                                            email: "",
                                            enroll:""
                                            
                                        })
                                    }}>
                                        Add Hub</button>
                                </div>
                            
                                
                                {message !=="" && <div className="alert alert-success">{message}</div>}
                                {error !== "" && <div className="alert alert-danger">{error}</div>}
                                {addStudent && this.studentForm(name, enroll, email)}
                                {addHub && this.hubForm(name)}
                                {viewHubs && this.display(hubs)}
                                {(viewStudents || viewCoordinators) && this.display(students)}
                                
                                {addCoordinator &&
                                    <>
                                        {this.state.hubs.length === 0 ?<>Please add hubs first</> : (
                                            <>
                                                <div className="text-muted">TICK THE HUBS APPLICABLE</div>
                                                {this.selectHubs(hubs)} <br />{this.studentForm(name, enroll, email)}
                                            </>
                                        )}
                                    </>
                                }
                            </>   
                        )}

                    </>)
                }   
            </>
            )
        }
}
export default AdminDashboard;