import React, { Component } from 'react'
import { getStudent } from './api'
import { isAuthenticated } from '../Auth/api'
import { load } from '../HW/api'
import { Link, withRouter } from 'react-router-dom'

class StudentDashboard extends Component{
    constructor() {
        super()
        this.state = {
            student: "",
            hubs: [],
            current: "",
            loading: false
            
        }
    }
    componentDidMount = () => {
        this.setState({loading:true})
        // this.setState({
        //     student:isAuthenticated().user
        // })

        load()
            .then(data => {
               
                if (data.error)
                    console.log(data.error)
                else {
                    this.setState({ hubs: data })
                    // console.log(" hubs",this.state.hubs)
                }
            })
        var id= {
                id:isAuthenticated().user._id
            }
            getStudent(id)
            .then(data => {
               
                if (data.error)
                    console.log(data.error)
                else {
                    this.setState({ student: data })
                    // console.log(" hubs",this.state.hubs)
                }
            })
    this.setState({loading:false})
        
    }
    displayHubs = (hubs) => (
             hubs.map((hub, i) => {

                return (
                    <div className="card col-md-4 mt-5" key={i}>
                            <h2 className="card-title">{i + 1} . {hub.name}</h2>
                            <Link className="btn btn-raised btn-primary"  to={`/workshops/${hub._id}`}>Know More</Link>
                        </div>
                )

            }               
        )             
    )
    
    displayWorkshops = (student) => 
        (
            <div>
            
            {student!=="" && !student.workshopsenrolled.length && <div className="alert alert-danger">You have not enrolled in any workshop!</div>}
            {student!=="" && student.workshopsenrolled.length>0 &&
                student.workshopsenrolled.map((w, i) => {
                    // console.log(w)
                    return (
                        <div className="card col-md-4 mt-5" key={i}>
                            <h6 className="card-title">{i+1}.{w.name}</h6>
                            
                            <Link className="card-title" to={`/workshop/${w.id}`}>Read More</Link>
                            
                        </div>
                    )
    
                }               
            )       
            }
            </div>
              
        )
    


    render() {
        const { student, loading, current, hubs } = this.state;
        console.log(isAuthenticated().user.type)
        return (
            <>
               
                    <div >
                        {loading ? <div>Loading......</div> : (
                            <>
                                {/* <Menu></Menu> */}
                                <div className="jumbotron">
                        
                                    <h5>  <strong>{` Welcome ${isAuthenticated().user.name}`}</strong></h5>
                                    <h4>{`${isAuthenticated().user.enroll}`}</h4>
                            
                            
                                </div>
                                <button className="btn btn-raised btn-primary ml-2" onClick={() => {
                                    this.setState({ current: "Hubs" })
                                }}>View Hubs</button>
                                <button className="btn btn-raised btn-primary ml-2" onClick={() => {
                                    this.setState({ current: "Workshops" })
                                }}>View Registerd Workshops</button>
                                {current === "Hubs" && this.displayHubs(hubs)}
                                {current === "Workshops" && this.displayWorkshops(student)}
                            </>
                        )}
                                            
                    </div>
                
            </>
            )
        }
}
export default StudentDashboard;