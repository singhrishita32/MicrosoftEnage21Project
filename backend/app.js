const express = require("express")
const app = express()
const morgan=require ("morgan")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const AdminRights = require('./Routes/Admin')
const StudentRights = require('./Routes/Student')
const HW=require('./Routes/HW')
const Authentication=require('./Routes/Auth')
const cookieparser=require('cookie-parser')
const bodyparser = require("body-parser")
const expressValidator = require('express-validator')
const cors = require('cors')
dotenv.config();

 mongoose.connect(process.env.API_URL,{useNewUrlParser: true, useUnifiedTopology: true})
     .then(() => {
     console.log("DB Connected Successfully!")
    })
mongoose.connection.on("error", err => {
    console.log("Connection Error")
})
app.use(cors())
app.use(expressValidator());
app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(cookieparser())
app.use('/', AdminRights)
app.use('/',StudentRights)
app.use('/', Authentication)
app.use('/',HW)
const port = process.env.PORT
app.listen(port, () => {
    console.log("Listening bro !")
});
