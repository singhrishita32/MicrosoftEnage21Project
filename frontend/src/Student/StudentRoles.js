import { React, Component } from 'react'
import { Link } from 'react-router-dom'
import '../style.css'
class StudentRoles extends Component {
  

    render() {
        return (
            <div >
                <div className="homelogin" >
                    <h4 className="mt-5 ml-5">CHOOSE ROLE</h4>
                    <div className="homeloginbutton1">
                        <Link  className="homeloginbutton2" to="/studentdashboard"> STUDENT </Link>
                    </div>
                    <div className="homeloginbutton1">
                        <Link className="homeloginbutton2" to="/coordinatordashboard">COORDINATOR </Link>
                    </div>
                </div>
            </div>
        )
   
    };
}


export default StudentRoles;