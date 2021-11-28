const mongoose = require('mongoose');
// const Workshop=require('./workshop')
const userSchema = new mongoose.Schema({
    name: {
        type:String
    },
    workshops: [{
        _id: false,
        id: {
            type: mongoose.Schema.ObjectId
        },
        name: {
            type:String
        }
    }],
    coordinators: [{
        _id: false,
        id: {
            type:mongoose.Schema.ObjectId   
        },
        email: {
            type:String
        }
    }]
})





module.exports = mongoose.model("Hub", userSchema);