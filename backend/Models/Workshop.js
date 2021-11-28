const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    days: [{
        _id:false,
        date: {
            type:Date
        },
        starttime: {
            type:Number
        },
        endtime: {
            type:Number
        }
    }],
    description: {
        type:String
    },
    studentsenrolled: [{
        _id:false,
        id: {
            type:mongoose.Schema.ObjectId
        },
        email: {
            type:String
        },
        name: {
            type:String
        },
        resultuploaded: {
            type:Boolean
        }
    }],
    kit: [{
        _id:false,
        item: {
            type:String
        }
    }],
    meetinglink: {
        type: String,
        
    },
    hub: {
        type: mongoose.Schema.ObjectId,
              
    },
    isActive: {
        type: Boolean
    },
    year1: {
        type:Boolean
    },
    year2: {
        type:Boolean
    },
    year3: {
        type:Boolean
    },
    year4: {
        type:Boolean
    },
    results: [{
        _id:false,
        email: {
            type:String
        },
        drivelink: {
            type:String
        },
        name: {
            type:String
        }
    }],
    resultsenabled: {
        type:Boolean
    },
    winners: [{
        _id:false,
        email: {
            type:String
        },

        name: {
            type:String
        }
    }],
    winnerdeclared: {
        type:Boolean
    },
    doubtforum: [{
        question: {
            type:String
        },
        answer: {
            type:String
        },
        postedby: {
            type:Number
        },
        answeredby: {
            type:Number
        }
    }],
    doubtforumenabled: {
        type:Boolean
    }
})
module.exports = mongoose.model("Workshop", userSchema);