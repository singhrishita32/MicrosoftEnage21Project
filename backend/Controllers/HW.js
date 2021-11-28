//get all workshops of a hub
const Workshop = require('../Models/Workshop')
const Hub = require('../Models/Hub')

//TO FETCH ALL WORKSHOPS OF HUB BY MONGOOSE ID OF THE HUB
exports.workshopsofHub = (req, res) => {
    const workshopsfound = [];
    Workshop.find()
        .then((workshops, err) => {
            console.log(workshops)
            if (err)
                res.json({ error: err })
            else {
                var len = workshops.length;
                for (var i = 0; i < len; i++) {
                    if (workshops[i].hub == req.body.hub)
                        workshopsfound.push(workshops[i]);
                }
                return res.json(workshopsfound);
                
            }
        })
    
}
// TO FETCH ALL COORDINATORS OF A HUB
exports.coordinatorsofHub = (req, res) => {
    console.log(req.body.id)
    Hub.findById(req.body.id)
        .exec((err, hub) => {
            if (err || !hub)
                return res.status(400).json({ 
                    error: "Some error occured!" })
            return res.json(hub)
    })

}

// UPDATE CHANGES IN WORKSHOP AND NOTOFY ALL STUDENTS ENROLLED IN IT        
exports.updateWorkshop = async(req, res) => {
   
    const workshop = await Workshop.findById({ _id: req.body.workshop })
    if(workshop)
        {
            workshop.description=req.body.description,
            workshop.meetinglink= req.body.meetinglink,
            workshop.name= req.body.name,
            workshop.kit= req.body.kit,
            workshop.days= req.body.days,
            workshop.year4=req.body.year4,
            workshop.year3= req.body.year3,
            workshop.year2= req.body.year2,
            workshop.year1 = req.body.year1
        
           
       
        for (var i = 0; i < req.body.studentsenrolled.length; i++) {
            const emailData = {
                from: "noreply@node-react.com",
                to: req.body.studentsenrolled[i].email,
                subject: "Update",
                text: `Their are few updates in the the workshop ${req.body.name} . You are requested to check it once.`
            };
            sendEmail(emailData);
        }
        workshop.save();
                res.json(workshop);
            }
    
    else
    {
        return res.status(400).json({ "error": "Some error occured!" })
    }
        
}
//FETCH WORKSHOP BY MONGOOSE ID
exports.workshopById = (req, res) => {
    console.log(req)
    Workshop.findById(req.body.id)
        .exec((err, workshop) => {
            if (err || !workshop)
                return res.status(400).json({ "error": "Some error occured!" })
            return res.json(workshop)
    })
}
//ENABLE DISABLE VARIOUS FORUM AND PERMISSIONS
exports.workshopEnableDisable = (req, res) => {
    Workshop.findById(req.body.workshop)
    .exec((err, workshop) => {
        if (err || !workshop)
            return res.status(400).json({ "error": "Some error occured!" })
        else
        {

            if(req.body.field=="resultsenabled")
                workshop.resultsenabled = !workshop.resultsenabled;
            
                if(req.body.field=="winnerdeclared")
                workshop.winnerdeclared = !workshop.winnerdeclared;
            
                if(req.body.field=="doubtforumenabled")
                workshop.doubtforumenabled = !workshop.doubtforumenabled;
            
                if(req.body.field=="isActive")
                workshop.isActive = !workshop.isActive;
            
            workshop.save();
            }
        return res.json(workshop)
})

}
//CREATE HUB
exports.createHub = async (req, res) => {
    console.log(req.body)
    const hub = new Hub(req.body)
    hub.save();
    res.status(200).json("Hub Created!");
}
//FETCH ALL HUBS
exports.allHubs = (req, res) => {
    
    Hub.find()
        .select("_id name workshops coordinators")
        .then((hubs) => { res.json(hubs) })
        .catch((err)=>{console.log(err)})
}
//CREATING WORKSHOP
exports.createWorkshop = (req, res) => {
    req.body.winnerdeclared=false;
    req.body.doubtforumenabled = false;
    req.body.resultsenabled = false;
    req.body.isActive = true;
    if (req.body.meetinglink === "")
        req.body.meetinglink = "Not yet uploaded."
    // console.log(req.body)
    const workshop = new Workshop(req.body)
    workshop.save();
    var obj = {
        id: workshop._id,
        email:workshop.name
    }
   
    Hub.findByIdAndUpdate(req.body.hub, { $push: { workshops: obj } }, { new: true }).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(workshop);
            }
        }
    ); 
}
