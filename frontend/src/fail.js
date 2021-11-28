import { React, Component } from 'react'
import { Link } from 'react-router-dom'
class Fail extends Component {
  

    render() {
        return (
            <>
            <div className="jumbotron">Not Authorized</div>
            <Link className="btn btn-primary btn-raised" to="/">GO BACK TO HOME PAGE</Link>
        </>
        )
   
    };
}


export default Fail;