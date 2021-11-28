const express = require('express'); 
const app=express();
const Student = require('../Controllers/Student')
const router = express.Router();
router.post('/signup',Student.signup); //SIGNUP
router.post('/studentsignin',Student.signinStudent) //SIGNIN
router.post('/enrollstudent', Student.studentEnrolled)//ENROLL IN WORKSHOP
router.post('/postquestion', Student.postQuestion) //POST QUESTIONIN DOUBT FORUM
router.post('/postanswer', Student.postAnswer)//POST ANSWER 
router.post('/student',Student.studentById) //FETCH STUDENT BY ID
router.put('/uploadresult', Student.uploadResult) // UPLOAD WORK
router.put('/declarewinner', Student.declareWinner) // DECLARE BEST PERFORMER
router.get('/allstudents',Student.allStudents)// FETCH ALL STUDENTS
module.exports = router



