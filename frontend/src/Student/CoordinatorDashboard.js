import React, { Component } from 'react'
import { getStudent } from './api'
import { isAuthenticated } from '../Auth/api'
import { saveWorkshop } from '../HW/api'
import {Link} from 'react-router-dom'

class CoordinatorDashboard extends Component {
    constructor() {
        super()
        this.state = {
            student: "",
            hubscoordinating: [],
            loading: false,
            type: "",
            addWorkshop: false,
            suitablefor4: true,
            suitablefor3: true,
            suitablefor2: true,
            suitablefor1: true,
            workshopname: "",
            workshopdescription: "",
            curr: "",
            currhubname:"",
            error: "",
            date: "",
            starttime: "",
            endtime:"",
            days:[],
            kit: [],
            meetinglink: "",
            item: "",
            msg:""
        }
    }
    componentDidMount = () => {
        this.setState({ loading: true ,error:""})
        
        const id = {
            id:isAuthenticated().user._id
        }
        getStudent(id)
            .then(data => {
               
                if (data.error)
                    this.setState({error:data.error})
                else {
                    this.setState({student: data ,hubscoordinating:data.hubscoordinating
                    })
        // console.log(" hubs",this.state.hubs)
            }
        })
                
        this.setState({
            type:isAuthenticated().user.type
        })
      
        this.setState({ loading: false })
        
        
    }
    handleChange = (str) => (event) => {

        this.setState({msg:""})
        if(event.target.type==="checkbox")
        {
            if (str === "suitablefor1")
                this.setState({ [str]: !this.state.suitablefor1 })
            
                if (str === "suitablefor2")
                this.setState({ [str]: !this.state.suitablefor2 })
            
                if (str === "suitablefor3")
                this.setState({ [str]: !this.state.suitablefor3 })
            
                if (str === "suitablefor4")
                this.setState({[str]:!this.state.suitablefor4})
        }
        else
        this.setState({
            [str]: event.target.value
        });
        // console.log("days",this.state.day)
    };
    clickSubmit = (event) => {
        this.setState({ loading: true })
        event.preventDefault()
       
        var workshop = {
            name:this.state.workshopname,
            description:this.state.workshopdescription,
            year1:this.state.suitablefor1,
            year2:this.state.suitablefor2,
            year3:this.state.suitablefor3,
            year4: this.state.suitablefor4,
            hub: this.state.curr,
            days: this.state.days,
            meetinglink: this.state.meetinglink,
            kit:this.state.kit
            
        }
        // console.log("before api",workshop)
            saveWorkshop(workshop)
            .then((data) => {
                if (data.error)
                    this.setState({ error: data.error })
                else
                    this.setState({ msg:"Added!",days:[],kit:[]})
            })
        this.setState({loading:false})
    }
    
    
    workshopForm = (meetinglink,starttime,endtime,date,suitablefor1, suitablefor2, suitablefor3, suitablefor4, workshopdescription, workshopname, curr) => (
       
        <div style={{width:"60%",marginLeft:"2%"}}>
                <h5><strong>You are creating workshop for the hub : {this.state.currhubname}</strong></h5> 
                <div className="form-group">

                
                <input 
                    onChange = {this.handleChange("workshopname")} 
                    type="text"
                    placeholder="Workshop Name"
                    className = "form-control mt-3"
                    value = {workshopname}>
                </input>

                <input 
                    onChange = {this.handleChange("workshopdescription")} 
                    type="text"
                    placeholder="Workshop Description"
                    className = "form-control mt-3"
                    value = {workshopdescription}>
                </input>
              
                <input 
                    onChange={this.handleChange("meetinglink")}
                    placeholder="Meeting Link"
                    type = "text" 
                    className = "form-control mt-3"
                    value = {meetinglink}>
                </input>
                
               
                
                <label> Date</label>
                <input 
                    onChange = {this.handleChange("date")} 
                    type = "date" 
                    className = "form-control mt-3"
                    value={date} />
                
                <input 
                    onChange={this.handleChange("starttime")}
                    placeholder="Start Time in 24hrs format"
                    type = "text" 
                    className = "form-control mt-3"
                    value = {starttime}>
                </input>
                
                <input 
                    onChange={this.handleChange("endtime")}
                    placeholder="End Time in 24 hrs format"
                    type = "text" 
                    className = "form-control mt-3"
                    value = {endtime}>
                </input>
                <button className="btn btn-raised btn-primary" onClick={(event) => {
                    event.preventDefault()
                    var arr = new Array();
                    arr = this.state.days;
                    var obj = {
                        date: this.state.date,
                        starttime:this.state.starttime,
                        endtime:this.state.endtime
                    }
                    arr.push(obj);
                    this.setState({ days: arr, date: "",starttime:"",endtime:"" })
                    console.log(this.state.days)
                }}>Click here to add this date</button>

                <br/>
                
                <input 
                    onChange={this.handleChange("item")}
                    placeholder="Component"
                    type = "text"
                    className = "form-control mt-3"
                    value={this.state.item} />
              <button className="btn btn-raised btn-primary" onClick={(event) => {
                    event.preventDefault()
                    var arr = new Array();
                    arr = this.state.kit;
                    var obj = {
                        item: this.state.item
                    }
                    arr.push(obj);
                    this.setState({ kit:arr,item:"" })
                    console.log(this.state.kit)
                }}>Click here to add this component to kit</button>
                <br/>
                <label className="text-muted">For 1st year</label>
                <input 
                    onChange = {this.handleChange("suitablefor1")} 
                    type = "checkbox" 
                    className = "form-control mt-3"
                    checked = {suitablefor1}>
                </input>
                <label className="text-muted">For 2nd year</label>
                <input 
                    onChange = {this.handleChange("suitablefor2")} 
                    type = "checkbox" 
                    className = "form-control mt-3"
                    checked = {suitablefor2}>
                </input>
                <label className="text-muted">For 3rd year</label>
                <input 
                    onChange = {this.handleChange("suitablefor3")} 
                    type = "checkbox" 
                    className = "form-control mt-3"
                    checked = {suitablefor3}>
                </input>
                <label className="text-muted">For 4th year</label>
                <input 
                    onChange = {this.handleChange("suitablefor4")} 
                    type = "checkbox" 
                    className = "form-control mt-3"
                    checked = {suitablefor4}>
                </input>
                </div>
                
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
           
                <button className="btn btn-raised btn-primary ml-2" onClick={() => { this.setState({ addWorkshop: false }) }}>Close</button>
                </div>
          
    )

    displayHubs = (starttime,endtime,date,hubscoordinating,suitablefor1,suitablefor2,suitablefor3,suitablefor4,workshopdescription,workshopname,curr) => (
        hubscoordinating.map((hub, i) => {
            // console.log(curr)
            return (
                <div className="card col-md-4" key={i}>
                    <h5 className="card-title">{hub.name}</h5>
                    
                        <Link to={`/workshops/${hub.id}`}>Know More</Link>
                    {this.state.type === "74b72e7ae3cc22d48fb304d6ad6978fe" &&
                        <button className="btn btn-raised btn-primary" onClick={() => {
                            this.setState({
                                addWorkshop: true, curr: hub.id,
                            currhubname:hub.name})
                        }}>Add Workshop</button>}
                    {/* {this.state.addWorkshop && this.workshopForm(starttime,endtime,date,suitablefor1,suitablefor2,suitablefor3,suitablefor4,workshopdescription,workshopname,curr) } */}
                </div>
            )

        }               
    )             
    )
    displaySchedule = (days) => (
        days.map((d, i) => {
            // console.log(curr)
            return (
                <div className="card col-md-4" key={i}>
                    <h5 className="mt-2 md-2">Day {i + 1}   . {d.date} , from {d.starttime}hrs to {d.endtime}hrs</h5>
                </div>
            )
        })
    )
    displayKit = (kit) => (
        kit.map((k, i) => {
            // console.log(curr)
            return (
            <div className="card col-md-4" key={i}>
                    <h5 className="mt-2 md-2">Component {i + 1} -{k.item}</h5>
            </div>
            )
        })
    )
    render() {
         const {meetinglink,kit,  days,starttime,endtime,date,loading, hubscoordinating ,suitablefor1,suitablefor2,suitablefor3,suitablefor4,workshopdescription,workshopname,curr} = this.state;
        
         //  console.log(student)
        return (
            <>
                {!isAuthenticated() || isAuthenticated().user.type !== "74b72e7ae3cc22d48fb304d6ad6978fe" ? <h4>Not authorized</h4>
                    : (
                        <div >
            
                            {loading ? <div>Loading......</div> : (
                                <>
                                    {this.state.msg === "" ? <></> : <div className="alert alert-success">{this.state.msg}</div>}
                                
                                    {!this.state.addWorkshop ? (
                                        <>
                                
                                            <div className="jumbotron">
                                                <h4>{` Welcome ${isAuthenticated().user.name}`}</h4>
                                                <h4>{`${isAuthenticated().user.enroll}`}</h4>
                                            </div>
                                            {this.displayHubs(starttime, endtime, date, hubscoordinating, suitablefor1, suitablefor2, suitablefor3, suitablefor4, workshopdescription, workshopname, curr)}
                                        
                                        </>
                                    ) :
                                        <>
                                            {this.state.days.length !== 0 && <><h5>SCHEDULE AS FOLLOWS:</h5>{this.displaySchedule(days)}</>}
                                            {this.state.kit.length !== 0 && <><h5>COMPONENTS NEEDED:</h5>{this.displayKit(kit)}</>}
                                            {this.workshopForm(meetinglink, starttime, endtime, date, suitablefor1, suitablefor2, suitablefor3, suitablefor4, workshopdescription, workshopname, curr)}
                                        
                                        </>
                                    }
                                </>
                            )}
                                            
                        </div>
                    )}
            </>
            )
        }
}
export default CoordinatorDashboard;