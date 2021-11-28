import React, { Component } from 'react'
import { Link ,Redirect} from 'react-router-dom'
import { getStudent } from '../Student/api'
import { isAuthenticated } from '../Auth/api'
import { getWorkshop, EnableDisable, uploadResult, getCoordinators  ,announceWinner,postQuestion,postAnswer} from './api'
// import ViewResults from './ViewResults'
class Workshop extends Component {
    constructor() {
        super()
        this.state = {
            workshop: "",
            loading: false,
            driveLink: "",
            resultuploadForm: false,
            redirecttoEditWorkshop:false,
            resultSubmitted: false,
            coordinators: "",
            isCoordinator: false,
            viewresults: false,
            viewdoubtforum: false,
            declareWinner: false,
            winnername: "",
            winneremail: "",
            question: "",
            answer: "",
            postAnswerBox: false,
            viewschedule: false,
            viewkit: false,
            viewstudentsenrolled: false,
            isAdmin:""
        }
    }
    componentDidMount = () => {
        this.setState({
            loading: true,
        isAdmin:(isAuthenticated().user.type==="33053ba875f4d3343184292fcbca5bba"?true:false)})
        var id = {
            id: this.props.match.params.workshopid
        }
        
        getWorkshop(id)
            .then((data) => {
                if (data.error)
                    console.log(data.error)
                else {
                    
                    this.setState({ workshop: data })
                    // console.log(this.state.workshop)
                    var hub = {
                        id: data.hub
                    }
             
                    getCoordinators(hub)
                        .then((data2) => {
                            if (data2.error)
                                console.log(data2.error)
                            else {
                                for (var j = 0; j < data2.coordinators.length; j++) {
                                    if (data2.coordinators[j].id === isAuthenticated().user._id) {
                                        this.setState({ isCoordinator: true })
                                        break;
                                    }
                                }
                            }
                        })
        
                }
            })
       
        
        
        id = {
            id: isAuthenticated().user._id
        }
        getStudent(id)
            .then((data) => {
                if (data.error)
                    console.log(data.error)
                else {
                    var len = data.workshopsenrolled.length;
                    for (var i = 0; i < len; i++) {
                        if (data.workshopsenrolled[i].id === this.props.match.params.workshopid &&
                            data.workshopsenrolled[i].resultuploaded === true) {
                            // console.log(data.workshopsenrolled[i].res)
                            this.setState({ resultSubmitted: true })
                            break;
                        }
                    }
                }
            })
        this.setState({ loading: false })
    }
    handleChange = (str) => (event) => {
        this.setState({ error: "" });
        this.setState({
            [str]: event.target.value
        });
    };
    
    clickSubmitResult = (event) => {
        // console.log("Here")
        event.preventDefault();
        this.setState({ loading: true })
        const details = {
            email: isAuthenticated().user.email,
            drivelink: this.state.driveLink,
            name:isAuthenticated().user.name,
            workshop: this.props.match.params.workshopid,
            stu: isAuthenticated().user._id
        }
        uploadResult(details)
            .then((data) => {
                if (data.error)
                    console.log(data.error)
                else
                    window.location.reload();
            })
        // console.log(details)
        this.setState({ loading: false })
    };
    resultForm = (driveLink) => (
        <>
            {this.state.loading ? <div> Loading..</div> : (
                <>
                    <form>
                        <h6 className="text-muted">You are expected to provide a link to a video where you will explain the project made in workshop and any other additional detail (eg. Youtube)</h6>
                        <div className="form-group">
                            <input
                                onChange={this.handleChange("driveLink")}
                                type="text"
                                className="form-control"
                                value={driveLink}>
                            </input>
                        </div>
                        <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={() => { this.setState({ resultuploadForm: false }) }}>Close</button>
                        <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={this.clickSubmitResult}>Submit</button>
                    </form>
                </>
            )}
        
        </>
          
    )
    clickEnable = (event) => {
        this.setState({ loading: true })
        const workshop = {
            workshop: this.state.workshop._id,
            field: "resultsenabled"
        }
        EnableDisable(workshop)
            .then((data) => {
                if (data.error)
                    console.log(data.error);
                else
                    window.location.reload();
            })
        this.setState({ loading: false })
       
    }
    clickEnable2 = (event) => {
        this.setState({ loading: true })
        const workshop = {
            workshop: this.state.workshop._id,
            field: "isActive"
        }
        EnableDisable(workshop)
            .then((data) => {
                if (data.error)
                    console.log(data.error);
                else
                    window.location.reload();
            })
        this.setState({ loading: false })
       
    }
    clickEnable3 = (event) => {
        this.setState({ loading: true })
        const workshop = {
            workshop: this.state.workshop._id,
            field: "doubtforumenabled"
        }
        EnableDisable(workshop)
            .then((data) => {
                if (data.error)
                    console.log(data.error);
                else
                    window.location.reload();
            })
        this.setState({ loading: false })
       
    }
    ViewResult = (workshop) => (
        ( workshop.results.length !== 0 ? workshop.results.map((r, i) => {

            return (
                <p>
                    {i + 1}. {r.name}  {r.email} <br />
                      <strong>Submitted Link : {r.drivelink}</strong>
               </p>
            )
        }) : <div>No submissions</div>
        )
    )
    ViewDoubtForum = (workshop) => (
        ( workshop.doubtforum.length !== 0 ? workshop.doubtforum.map((r, i) => {

            return (
                <div className="card col-md-4 mt-5" key={i}>
                    <p className="card-title">
                    <h6>Question - {r.question}</h6>
                    <span className="text-muted">Posted by Enrollment Number: {r.postedby}</span></p>
                    
                    {r.answer != "" && 
                        <>
                            <p className="card-title">
                            <h6>Answer - {r.answer}</h6>
                            <span className="text-muted">Posted by Enrollment Number: {r.answeredby}</span></p>
                        </>
                    }
                    {(r.answer === "" && !this.state.isCoordinator) && 
                        <h5 className="card-title">Answer not available</h5>
                    }
                     {(r.answer === "" && this.state.isCoordinator) && 
             
                        <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={() => {
                            this.setState({ postAnswerBox: true, question: r.question, curr: r._id })
                        console.log(this.state.curr)}}>Answer</button>
                     }
                </div>
            )
        }) : <div className="text-muted">Students can post their workshop related doubts here! The coordinators will answer as soon as possible.</div>
        )
    )
    announceWinner = (event) => {
        event.preventDefault();
        var winner = {
            workshop: this.state.workshop._id,
            name: this.state.winnername,
            email:this.state.winneremail
        }
        console.log(winner)
        announceWinner(winner)
        .then((data) => {
            if (data.error)
                console.log(data.error);
            else
                window.location.reload();
        })
        
    }
    winnerForm = (winnername, winneremail) => (
        <div>
            <p>Enter following details of best performing student</p>
        <label className="text-muted">Email</label>
        <input
            onChange={this.handleChange("winneremail")}
            type="text"
            className="form-control"
            value={winneremail}>
    </input>
    <label className="text-muted">Name</label>
        <input
            onChange={this.handleChange("winnername")}
            type="text"
            className="form-control"
            value={winnername}>
            </input>
            <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={this.announceWinner}> Declare </button>
            <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={() => {
                this.setState({
                    declareWinner: false,
                    viewresults:false
                })
            }}> Close </button>
            
    </div>
    )
    postquestion = (event) => {
        const details = {
            workshop:this.state.workshop._id,
            question: this.state.question,
            postedby:isAuthenticated().user.enroll
        }
        postQuestion(details)
            .then((data) => {
            console.log(data)
            if (data.error)
                console.log(data.error);
            else
                window.location.reload();
        })
    }
    postAnswer = (event) => {
        event.preventDefault();
        const details = {
            workshop:this.state.workshop._id,
            answer: this.state.answer,
            questionId:this.state.curr,
            enroll:isAuthenticated().user.enroll
        }
        // console.log(details)
        postAnswer(details)
            .then((data) => {
            console.log(data)
                if (data.error)
                    console.log(data.error);
                else {
                    window.location.reload();
                
                }
        })
    }
    ViewDays = (workshop) => (
        ( workshop.days.length !== 0 ? workshop.days.map((r, i) => {
            return (
                <div className="card col-md-4" key={i}>
                    <div className="mt-2 md-2">Day {i + 1}   . {r.date[8]}{r.date[9]}-{r.date[5]}{r.date[6]}-{r.date.substr(0, 4)}   From {r.starttime}hrs to {r.endtime}hrs</div>
                </div>
            )
        }) : <div>Not available!</div>
        )
    )
    ViewStudents = (workshop) => (
        ( workshop.studentsenrolled.length !== 0 ? workshop.studentsenrolled.map((r, i) => {

            return (
                <div className="card col-md-4 mt-2" key={i}>
                    <p style={{fontSize:"medium"}}>{i + 1}. {r.name} <br />
                        Email: {r.email}</p>
                </div>
            )
        }) : <div>No one has enrolled yet!</div>
        )
    )
    ViewKit= (workshop) => (
        ( workshop.kit.length !== 0 ? workshop.kit.map((k, i) => {
            return (
                <div className="card col-md-4" key={i}>
                    <div className="card-title">{i + 1}. {k.item}</div>
                    
                </div>
            )
        }) : <div>No items needed</div>
        )
    )
    render() {
        const { winneremail,  winnername, question, answer,isAdmin,workshop,loading,postAnswerBox,isCoordinator,resultSubmitted,viewstudentsenrolled } = this.state
        
        return (
            <>
                <div className="jumbotron"><h5><strong>WORKSHOP DETAILS</strong></h5></div>
                {loading ? <>Loading....</> : (
                    <>
                        {postAnswerBox ? 
                            <div className="ml-4">
                                <label>Question-{question}</label>
                                <br />
                                <input
                                    onChange={this.handleChange("answer")}
                                    type="text"
                                    placeholder="Post answer"
                                    value={answer}>
                                </input>
                                <br/>
                                <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={() => { this.setState({ postAnswerBox: false }) }}>Close</button>
                                <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={this.postAnswer}>post</button>
                            </div>
                            :
                            (
                                <>
                                    <div className="card">
                                        <div className="card-header">
                                            <h5><strong>{workshop.name}</strong></h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">{workshop.description}</p>
                                            
                                            <p className="card-text">Meeting Link : {workshop.meetinglink}</p>
                                        </div>
                                    </div>
                                    
                                    <div>{this.state.workshop.winnerdeclared && <div className="alert alert-success">{this.state.workshop.winners[0].name} IS DECLARED AS THE BEST PERFORMER IN THE WORKSHOP </div>}</div>
                                    <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={() => { this.setState({ viewschedule: true }) }}>View Schedule</button>
                                    <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={() => { this.setState({ viewkit: true }) }}>View Kit</button>
                                    
                                    {this.state.isCoordinator &&
                                        <>
                                            
                                            <Link className="btn btn-raise btn-primary ml-2 mt-2" to={`/editworkshop/${this.props.match.params.workshopid}`}>Edit Workshop</Link>
                                            {workshop.resultsenabled && <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={this.clickEnable}>Disable Work Sumbmission</button>}
                                            {!workshop.resultsenabled && <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={this.clickEnable}>Enable Work Sumbmission</button>}
                                            {workshop.isActive && <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={this.clickEnable2}>Close Registrations</button>}
                                            {!workshop.isActive && <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={this.clickEnable2}>Open Registrations</button>}
                                            {workshop.doubtforumenabled && <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={this.clickEnable3}>Close DoubtForum</button>}
                                            {!workshop.doubtforumenabled && <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={this.clickEnable3}>Open DoubtForum</button>}
                                            <button className="btn btn-raise btn-primary ml-2 mt-2" disabled={this.state.workshop.winnerdeclared} onClick={() => { this.setState({ viewresults: true,declareWinner:true }) }}>Declare Best Performer</button>
                                            <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={()=>{this.setState({viewstudentsenrolled:true})}}>View Students</button>
                                            <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={() => {
                                                    this.setState({viewresults:true})
                                            }}>View Submissions</button>
                                            
                                            
                                        </>
                                    
                                    }
                                    {isAdmin && <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={() => {
                                        this.setState({ viewstudentsenrolled: true })
                                    console.log(this.state.viewstudentsenrolled)}}>View Students</button>}
                                    {((!this.state.isCoordinator && this.state.workshop.doubtforumenabled)|| (this.state.isCoordinator)) && <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={() => {
                                            this.setState({viewdoubtforum:true})
                                        }}>View Doubt Forum</button>}
                                    
                                    {workshop.resultsenabled && !isCoordinator && !isAdmin && 
                                        <>
                                        {!resultSubmitted ?
                                            <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={() => { this.setState({ resultuploadForm: true }) }}>Submit your work</button> : (
                                                <p className="text-muted">
                                                   You submission has been uploaded! 
                                                </p>
                                        )}
                                        </>
                                    }
                                   
                                     
                                    {this.state.resultuploadForm && this.resultForm(this.state.driveLink)}
                                    {this.state.viewresults && <><h6>SUBMISSIONS MADE BY STUDENTS</h6>{this.ViewResult(this.state.workshop)}  <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={() => { this.setState({ viewresults: false }) }}>Close</button></>}
                                    {this.state.viewschedule && <> {this.ViewDays(this.state.workshop)}  <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={() => { this.setState({ viewschedule: false }) }}>Close</button></>}
                                    {this.state.viewkit && <> {this.ViewKit(this.state.workshop)}  <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={() => { this.setState({ viewkit: false }) }}>Close</button></>}
                                    {this.state.viewdoubtforum && <> <h6>DOUBT FORUM</h6>{this.ViewDoubtForum(this.state.workshop)}  <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={() => { this.setState({ viewdoubtforum: false }) }}>Close</button></>}
                                    {this.state.declareWinner && this.winnerForm(winnername, winneremail)}
                                    { viewstudentsenrolled &&<>{ this.ViewStudents(workshop)} <button className="btn btn-raised btn-primary mt-2 ml-1" onClick={() => {
                                        this.setState({
                                            viewstudentsenrolled:false
                                        })
                                    }}>Close</button></>}
                                    {this.state.viewdoubtforum && !isCoordinator && !isAdmin &&
                                        <div>    
                                            <input
                                            onChange={this.handleChange("question")}
                                                type="text"
                                                placeholder="Post question"
                                                value={question}>
                                            </input>
                                            <button className="btn btn-raise btn-primary ml-2 mt-2" onClick={this.postquestion}>Post</button>
                                        </div>
                                        }
                                </>    
                            )}
                        
                    </>)
                }
            </>
        )
    }
}
export default Workshop;

 