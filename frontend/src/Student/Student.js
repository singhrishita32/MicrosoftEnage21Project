import React, { Component } from 'react'
import { getStudent } from './api'
import {Link} from 'react-router-dom'
class StudentPage extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            student: "",
            workshopsenrolled: "",
            hubscoordinating:""
        }
    }
    componentDidMount = () => {
        this.setState({ loading: true })
        var student = {
            id:this.props.match.params.studentid
        }
        getStudent(student)
        .then((data => {
            this.setState({ student: data ,workshopsenrolled:data.workshopsenrolled,hubscoordinating:data.hubscoordinating})
            // console.log(this.state.student)
        })
        )
        
        this.setState({ loading: false })
    }
    display = (arr) => (
        
        arr.map((element, i) => {
            return (
            <>
            
                <div className="card col-md-4 mt-1 " key={i}>
                        <Link style={{textDecoration:"none"}}to={`/workshop/${element._id}`}  className="card-title strong mt-2">{i + 1}.{element.name}</Link>
                </div>
            
                    
            </>
           )

       }               
   )             
)
     render() {
         const { student ,workshopsenrolled,hubscoordinating}=this.state
                
        return (
            <>
                <div className="jumbotron"><h5><strong>STUDENT DETAILS</strong></h5></div>
                {this.state.loading ? <>Loading....</> : (
                    <>
                        <h5>PERSONAL DETAILS</h5>
                        <p style={{fontSize:"medium",marginLeft:"5px"}}>Name:{student.name}
                        <br/>Enroll:{student.enroll}
                        <br/>Email:{student.email}</p>
                        {workshopsenrolled === "" ? <h5>LOADING..</h5> : <>{workshopsenrolled.length === "" && <div className="alert alert-danger">Not enrolled in any workshop</div>}</>}
                        {workshopsenrolled.length !== 0 && <> <h5>WORKSHOPS ENROLLED:</h5> {this.display(workshopsenrolled)} </>}
                        {hubscoordinating.length !== 0 &&<> <h5>HUBS COORDINATING:</h5> {this.display(hubscoordinating)} </> }
                    </>
                    
                )}

            </>
            
          
        )
    }
}
export default StudentPage;

 
 