import React from 'react'
import { Route, Switch } from 'react-router-dom'
import StudentLogin from './Student/StudentLogin'
import Home from './core/Home'
import StudentDashboard from './Student/StudentDashboard';
import CoordinatorDashboard from './Student/CoordinatorDashboard'
import HubWorkshops from './HW/HubWorkshops'
import Workshop from './HW/Workshop'
import StudentRoles from './Student/StudentRoles';
import Student from './Student/Student'
import AdminLogin from './Admin/AdminLogin'
import AdminDashboard from './Admin/AdminDashboard';
import { isAuthenticated } from './Auth/api';
import Menu from './core/Menu';
import EditWorkshop from './HW/EditWorkshop'
const MainRouter = () => {
    return (
        <div>
            {isAuthenticated() &&
                <>
                    <Menu></Menu>
                </>
            }
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/adminlogin" component={AdminLogin}></Route>
                <Route exact path="/admindashboard" component={AdminDashboard}></Route>
                <Route exact path="/workshops/:hub" component={HubWorkshops}></Route>
                <Route exact path="/student/:studentid" component={Student}></Route>
                <Route exact path="/studentlogin" component={StudentLogin}></Route>
                <Route exact path="/studentdashboard" component={StudentDashboard}></Route>
                <Route exact path="/coordinatordashboard" component={CoordinatorDashboard}></Route>
                <Route exact path="/studentroles" component={StudentRoles}></Route>
                <Route exact path="/editworkshop/:workshopid" component={EditWorkshop}></Route>
                <Route exact path="/workshop/:workshopid" component={Workshop}></Route>
            </Switch>
        </div>
    );
};

export default MainRouter;