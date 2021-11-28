import React, { Component } from 'react'
import { workshopsOfHub } from './api'
import { Link } from 'react-router-dom'
import { enrollStudent,getCoordinators } from './api'
import { getStudent } from '../Student/api'
import {isAuthenticated} from '../Auth/api'
class HubWorkshops extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            workshops: [],
            workshopswithenrollment: [],
            error: "",
            year: "",
            student: "",
            notFitModal: false,
            isCoordinator: false,
            msg:""
           
            
        }
    }
    componentDidMount = () => {
        this.setState({ loading: true, error: "" })
        var hub = {
            hub: this.props.match.params.hub,
        }
        workshopsOfHub(hub)
        
            .then((data) => {
                this.setState({ workshops: data })
            })
        var id = {
            id: isAuthenticated().user._id
        }
        getStudent(id)
            .then((data) => {
                if (data.error)
                    this.setState({ error: data.error })
                else {
                    this.setState({
                        workshopswithenrollment: data.workshopsenrolled,
                    student:data})
                }
            })
            
            hub = {
                id: this.props.match.params.hub,
            }
        getCoordinators(hub)
                 
                 .then((data2) => {
                     if (data2.error)
                     console.log(data2.error)
                 else
                     {
                         for (var j = 0; j < data2.coordinators.length; j++)
                         {
                             if (data2.coordinators[j].id === isAuthenticated().user._id)
                             {
                                 this.setState({ isCoordinator: true })
                                 break;
                                 }
                             }
                 }
             })
        // var y = (this.state.student.enroll)
        
        this.setState({ loading: false })
    }
 
   
   
    displayWorkshops = (workshops, workshopsenrolled,student) => (
        workshops.map((w1, i) => {
            var f = false;
            workshopsenrolled.map((w2, j) => {
                if (w1._id === w2.id) {
                    f=true
                } 
            })
                return (
                    <div className="card col-md-4 mt-5 " key={i}>
                        <h2 className="card-title strong mt-2">{w1.name}</h2>
                        <div className="card-title">{w1.description}</div>
                        <div>This workshop is recommended for following years <br />
                            {w1.year1 && <>1st Year</>}<br />
                            {w1.year2 && <>2nd Year</>}<br />
                            {w1.year3 && <>3rd Year</>}<br />
                            {w1.year4 && <>4th Year</>}</div>
                        {(this.state.isCoordinator || isAuthenticated().user.type==="33053ba875f4d3343184292fcbca5bba") && <Link to={`/workshop/${w1._id}`}>
                        Click here for more options </Link>}
                        <button className="btn btn-raised " disabled={f || this.state.isCoordinator || !w1.isActive || isAuthenticated().user.type==="33053ba875f4d3343184292fcbca5bba"} onClick={() => {
                            this.setState({ loading: true })
                            
                            var enrollmentdetails = {
                                workshopname: w1.name,
                                description: w1.description,
                                kit: w1.kit,
                                meetinglink: w1.meetinglink,
                                isActive: w1.isActive,
                                year1: w1.year1,
                                year2: w1.year2,
                                year3: w1.year3,
                                year4: w1.year4,
                                resultsenabled: w1.resultsenabled,
                                doubtforum: w1.doubtforum,
                                workshop: w1._id,
                                days:w1.days,
                                stu: isAuthenticated().user._id,
                                name: isAuthenticated().user.name,
                                email: isAuthenticated().user.email
            
                                
                            }
                           
                                enrollStudent(enrollmentdetails)
                                    .then((data) => {
                                        if (data.error)
                                            this.setState({ error: data.error })
                                        else {
                                            this.setState({ loading: false,msg:"Registered!" })
                                            window.location.reload();
                                            
                                        }
                                    
                                    })
                            
                        }}>Register</button>
                    </div>
                )
            
        })
    )
        
            
    render() {
        const {msg, loading, workshops, workshopswithenrollment ,student} = this.state
      
                
        return (
            <div>
                {msg === "" ? <></> : <div className="alert alert-success">{msg}</div>}
                <div className="jumbotron"><h5><strong>WORKSHOPS</strong></h5></div>
                {workshops===[] ? <div>Loading..</div> : (<>{workshops.length === 0 ? <h5>No workshops currenly!</h5> : (<>{this.displayWorkshops(workshops, workshopswithenrollment, student)}</>)}</> )}
                
        </div>
        )
    }
}
export default HubWorkshops;

 