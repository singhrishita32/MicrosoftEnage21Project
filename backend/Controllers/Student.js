const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
require('dotenv').config()
const { sendEmail } = require("./helper");
const Student = require('../Models/Student')
const Workshop = require('../Models/Workshop')
const Hub = require('../Models/Hub')


//STUDENT SIGNIN
exports.signinStudent = (req, res) => {
    const { email, password } = req.body
    Student.findOne({ email }, (error, student) => {
        if (error || !student)
            return res.status(401).json({ error: "Email does not exist!" })
    
        if (!student.authenticate(password))
            return res.status(401).json({ error: "Email and password do not match" });


        const token = jwt.sign({ _id: student._id }, process.env.JWT_SECRET);
        res.cookie("t", token, { expire: new Date() + 0 })
        const { _id, name,enroll, workshopsenrolled,email,hubscoordinating} = student

        var usertype = hubscoordinating.length ? "Coordinator" : "Student";
        var crypto = require('crypto');
        var assert = require('assert');

        var algorithm = 'aes256'; 
        var key = 'password';
      

        var cipher = crypto.createCipher(algorithm, key);
        var type = cipher.update(usertype, 'utf8', 'hex') + cipher.final('hex');
        var decipher = crypto.createDecipher(algorithm, key);
        var decrypted = decipher.update(type, 'hex', 'utf8') + decipher.final('utf8');
            return res.json({ token, user: { _id, name,enroll, workshopsenrolled, email, hubscoordinating, type } });
       
            
    })
}

//STUDENT SIGNUP AND COORDINATOR , PASSWORD SENT THROUGH EMAIL
exports.signup = async (req, res) => {
    var randomstring = Math.random().toString(36).slice(2);
    const studentExists = await Student.findOne({ email: req.body.email })
    if (studentExists)
        return res.status(403).json({ error: "Email taken" });
    
    req.body.password = randomstring;
    const student = await new Student(req.body)
    await student.save();
    if (!req.body.hubscoordinating)
        req.body.hubscoordinating = [];
    var len = student.hubscoordinating.length
    var obj = {
                    id: student._id,
                    email:req.body.email
    }
    
    for (var i = 0; i < len; i++)
    {
        Hub.findByIdAndUpdate(req.body.hubscoordinating[i].id, { $push: {  coordinators: obj } }, { new: true }).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } 
        })
    }
    const emailData = {
            from: "noreply@node-react.com",
            to: req.body.email,
            subject: "Registration Instruction",
            text: `You have been successfully registerd on the JIIT Hub Portal.Your password is ${randomstring} .`
        };
        sendEmail(emailData);
    
        res.status(200).json("Added!");
}
// ENROLLING STUDENT IN A WORKSHOP
exports.studentEnrolled = (req, res) => {

    var obj1 = {
        id:req.body.workshop,
        name:req.body.workshopname,
        description: req.body.description,
        kit: req.body.kit,
        isActive: req.body.isActive,
        year1: req.body.year1,
        year2:req.body.year2,
        year3: req.body.year3,
        year4: req.body.year4,
        resultuploaded: false,
        days:req.body.days
        
    }
    Student.findByIdAndUpdate(req.body.stu,{ $push: { workshopsenrolled: obj1 } }, { new: true }).exec(
        (err, result1) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                var obj2 = {
                    id: req.body.stu,
                    email: req.body.email,
                    name:req.body.name
                }
                Workshop.findByIdAndUpdate(req.body.workshop, { $push: { studentsenrolled: obj2 } }, { new: true }).exec(
                    (err, result) => {
                        if (err) {
                            return res.status(400).json({
                                error: err
                            });
                        } else {
                            res.json(result1);
                        }
                    })
            }
        });
}
//POST QUESTION IN DOUBT FORUM
exports.postQuestion = (req, res) => {
    var obj = {
        postedby: req.body.postedby,
        question: req.body.question,
        answer: "",
        answeredby:""
    }
    
    Workshop.findByIdAndUpdate(req.body.workshop, { $push: { doubtforum: obj } }, { new: true }).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                return res.json(result);
            }
        })
}
//POST ANSWER
exports.postAnswer = async (req, res) => {
    const workshop =await  Workshop.findById({ _id: req.body.workshop })

    if (workshop)
    {
        var len = workshop.doubtforum.length;
        for (var i = 0; i < len; i++)
        {
            if(workshop.doubtforum[i]._id == req.body.questionId)
            {
                workshop.doubtforum[i].answer = req.body.answer;
                workshop.doubtforum[i].answeredby = req.body.enroll;
                workshop.save();
                return res.status(200).json("Answer Added");
            }
        }
    }
    else
        return res.status(400).json({error:"Some error occured!"})
}
// SUBMIT WORK
exports.uploadResult = (req, res) => {

    var obj = {
        email: req.body.email,
        drivelink: req.body.drivelink,
        name:req.body.name
    }
    Workshop.findByIdAndUpdate(req.body.workshop, { $push: { results: obj } }, { new: true }).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {

                Student.findById(req.body.stu)
                    .exec((err, student) => {
                        if (err || !student)
                            return res.status(400).json({ "error": "Some error occured!" })
                        else {
                            
                            var len = student.workshopsenrolled.length;
                            for (var j = 0; j < len; j++) {
                                if (student.workshopsenrolled[j].id == req.body.workshop) {
                                    student.workshopsenrolled[j].resultuploaded = true;
                                    student.save();
                                
                                    return res.json(result);
                                }
                            }
                        }
                    })               
            }
        })
}
//FETCH STUDENT BY MONGOOSE ID
exports.studentById = (req, res) => {
    // console.log(req)
    Student.findById(req.body.id)
        .exec((err, student) => {
            if (err || !student)
                return res.status(400).json({ "error": "Some error occured!" })
            return res.json(student)
    })
}
// DECLARE BEST PERFORMING STUDENT OF WORKSHOP
exports.declareWinner = (req, res) => {
    var obj = {
        name: req.body.name,
        email:req.body.email
    }
    
    Workshop.findById(req.body.workshop)
        .exec((err, w) => {
            if (err || !w)
                return res.status(400).json({ "error": "Some error occured!" })
            
            
            w.winnerdeclared = true;
            w.winners.push(obj)

            w.save();
            return res.json(w)

    })
}
//FETCH ALL STUDENTS
exports.allStudents = (req,res) => {
    Student.find( (err,students)=>{
        if(err)
            return res.status(400).json({error: err});
        res.json(students)
    }).select("_id name enroll email hubscoordinating workshopsenrolled");
}