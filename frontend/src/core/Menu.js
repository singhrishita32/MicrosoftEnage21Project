import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout,isAuthenticated} from '../Auth/api'

const isActive = (history, path) => {
    if(history.location.pathname === path)
        return {color: "#000000"}
    else
        return {color: "#009999"}
}

const Menu = ({history}) => (
    <div>
        
        { isAuthenticated() && (
            < div className="navbar">
                <ul>
                    <Link style={{textDecoration:"none"}} to={isAuthenticated().user.type==="96566473ecf148aaf90f4e33c63f07fb"?"/studentdashboard":(isAuthenticated().user.type==="74b72e7ae3cc22d48fb304d6ad6978fe")?"/studentroles":"/admindashboard"}>Go to Dashboard</Link>
                        </ul>
                    <ul className = "navbar-nav navbar-nav ml-auto inline">
                    <li className = "nav-item" >
                            <Link className = "nav-link" style={isActive(history, "/signout")} to="/" onClick={() => signout(()=>history.push("/"))}>SignOut</Link>
                    </li>
                    
                    </ul>
            </div>
        
        )}
    </div>
                
)


export default withRouter(Menu);