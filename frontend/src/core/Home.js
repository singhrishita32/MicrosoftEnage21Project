import { React, Component } from 'react'
import { Link } from 'react-router-dom'
import '../style.css'
class Home extends Component {
    render() {
        return (
            <div >
                <div className="jumbotron">
                    <h5>JAYPEE INSTITUTE OF INFORMATION TECHNOLOGY</h5>
                    <p>
                       <strong>
                            Hub Management Portal <br />
                            -By Rishita Singh <br/>
                            -Microsoft Engage Mentorship Program 2021
                        </strong>
                    </p>
                </div>
                <div className="homelogin" >
                    <div className="homeloginbutton1">
                        <Link  className="homeloginbutton2" to="/adminlogin"> LOGIN AS ADMIN</Link>
                    </div>
                    <div className="homeloginbutton1">
                        <Link className="homeloginbutton2" to="/studentlogin"> LOGIN AS STUDENT</Link>
                    </div>
                </div>
            </div>
        )
    }
}


export default Home;