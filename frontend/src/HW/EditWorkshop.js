import React, { Component } from 'react'
import { getWorkshop,editWorkshop} from './api'
class EditWorkshop extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            name: "",
            description: "",
            meetinglink: "",
            kit: [],
            days: "",
            days2:[],
            suitablefor4: "",
            suitablefor3: "",
            suitablefor2: "",
            suitablefor1: "",
            studentsenrolled:""
            
        }
    }
    componentDidMount = () => {
        this.setState({ loading: true })
        var id = {
            id: this.props.match.params.workshopid
        }
        getWorkshop(id)
            .then((data) => {
                if (data.error)
                    console.log(data.error)
                else {
                    this.setState({
                        name: data.name,
                        description: data.description,
                        meetinglink: data.meetinglink,
                        kit: data.kit,
                        days: data.days,
                        days2:data.days,
                        suitablefor4: data.year4,
                        suitablefor3: data.year3,
                        suitablefor2: data.year2,
                        suitablefor1: data.year1,
                        workshop: this.props.match.params.workshopid,
                        studentsenrolled:data.studentsenrolled
                    })
                    // console.log(this.state.suitablefor1,this.state.suitablefor2,this.state.suitablefor3,this.state.suitablefor4)
                }
            })
    }
    clickSubmit = (event) => {
        this.setState({ loading: true })
        event.preventDefault()
       
        var workshop = {
            name:this.state.name,
            description:this.state.description,
            year1:this.state.suitablefor1,
            year2:this.state.suitablefor2,
            year3:this.state.suitablefor3,
            year4: this.state.suitablefor4,
            days: this.state.days,
            meetinglink: this.state.meetinglink,
            kit: this.state.kit,
            studentsenrolled: this.state.studentsenrolled,
            workshop:this.props.match.params.workshopid
            
        }
        // console.log("before api",workshop)
            editWorkshop(workshop)
            .then((data) => {
                if (data.error)
                    this.setState({ error: data.error })
                else
                    window.location.reload()
                
            })
        this.setState({ loading: false })
        
    }
    
    handleChange = (str) => (event) => {
        this.setState({ error: "" });
        // console.log(str)
        if (event.target.type === "checkbox")
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
        {
            this.setState({
                [str]: event.target.value
            });
        }
    };
    handleDays=(i,str)=>(event) => {
        this.setState({ error: "" });
        
        var arr = new Array();
        
            arr=this.state.days

        if(str==="date")
        arr[i].date = event.target.value
        else if (str === "startime")
            arr[i].starttime = event.target.value
       else if (str === "endtime")
            arr[i].endtime=event.target.value    
        else
            arr[i].item = event.target.value
        
        this.setState({
           days:arr 
        });
    
    }
    ViewDays = (days) => (
        ( days.length !== 0 ? days.map((r, i) => {
            
            return (
                <>
                    <div className="card mt-3"><strong>DAY {i + 1}</strong>
                     <label> Start Time</label>
                    <input 
                    onChange={this.handleDays(i,"starttime")}
                    type = "text" 
                    className = "form-control"
                        value={this.state.days[i].starttime} />
                     <label> End Time</label>
                    <input 
                    onChange={this.handleDays(i,"endtime")}    
                    type = "text" 
                    className = "form-control"
                    value={this.state.days[i].endtime} />
                     
                    <label> Date</label>
                    <input
                    onChange = {this.handleDays(i,"date")} 
                    type = "date" 
                    className = "form-control"
                            value={this.state.days[i].date.substr(0, 10)} />
                    </div>    
                </>
                
            )
        }) : <div>Not available!</div>
        )
    )
    handleKit=(i)=>(event) => {
        this.setState({ error: "" });
        
        var arr = new Array();
        
            arr=this.state.kit
            arr[i].item = event.target.value
        
        this.setState({
           kit:arr 
        });
    
    }
    
    ViewKit= (kit) => (
        ( kit.length !== 0 ?kit.map((k, i) => {

            return (
                <div className="card col-md-4" key={i}>
                    <label> Component {i + 1}</label>
                    <input 
                    onChange={this.handleKit(i,"kit")}
                    type = "text" 
                    className = "form-control"
                        value={this.state.kit[i].item} />
                </div>
            )
        }) : <div>No items needed</div>
        )
    )
    render() {
        const { name, description, suitablefor2, suitablefor1, suitablefor3, suitablefor4, meetinglink, kit, days } = this.state
        // console.log(days)
        return (
                <>
                <div className="jumbotron"><h5><strong>Workshop Details</strong></h5></div>
                
                <div className="form-group ml-2" style={{width:"60%"}}>

                <label className="text-muted">Name</label>
                <input 
                    onChange = {this.handleChange("name")} 
                    type = "text" 
                    className = "form-control"
                    value = {name}>
                </input>
                

                <label className="text-muted">Description</label>
                <input 
                    onChange = {this.handleChange("description")} 
                    type = "text" 
                    className = "form-control"
                    value = {description}>
                    </input>
                    {<><h5 className="mt-3">Schedule</h5>{this.ViewDays(days)}</>}
                    {<><h5 className="mt-3">Components Needed</h5>{this.ViewKit(kit)}</>}
                <label className="text-muted">Meeting Link</label>
                <input 
                    onChange = {this.handleChange("meetinglink")} 
                    type = "text" 
                    className = "form-control"
                    value = {meetinglink}>
                </input>

                <label className="text-muted">For 1st year</label>
                <input 
                    onChange = {this.handleChange("suitablefor1")} 
                    type = "checkbox" 
                    className = "form-control"
                    checked = {suitablefor1}/>
                <label className="text-muted">For 2nd year</label>
                <input 
                    onChange = {this.handleChange("suitablefor2")} 
                    type = "checkbox" 
                    className = "form-control"
                    checked = {suitablefor2}>
                </input>
                <label className="text-muted">For 3rd year</label>
                <input 
                    onChange = {this.handleChange("suitablefor3")} 
                    type = "checkbox" 
                    className = "form-control"
                    checked = {suitablefor3}>
                </input>
                <label className="text-muted">For 4th year</label>
                <input 
                    onChange = {this.handleChange("suitablefor4")} 
                    type = "checkbox" 
                    className = "form-control"
                    checked = {suitablefor4}>
                </input>
                </div>

                <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update</button>

                
            </>
          
        )
    }
}
export default EditWorkshop;

 