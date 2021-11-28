const mongoose = require('mongoose');
const uuidv1 = require('uuidv1')
const crypto =  require('crypto')
//const {ObjectId} =mongoose.Schema
const userSchema = new mongoose.Schema({
        enroll: {
        type: String,
        trim: true,
        required:true
        
    },
    name: {
        type:String
    },
    workshopsenrolled: [{
        _id:false,
        id: {
            type:mongoose.Schema.ObjectId
        },
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
      
        kit: [{
            _id:false,
            item: {
                type:String
            }
        }],
      
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
        resultuploaded: {
            type:Boolean
        }
    }],
    email: {
        type: String,
        trim: true,
        required: true
    },
    hubscoordinating: [{
        _id:false,
        id: {
            type: mongoose.Schema.ObjectId
        },
        name: {
            type:String
        }
    }],
    hashed_password: {
        type: String,
        required: true
    },
    salt : String
})

userSchema.virtual('password')
.set(function(password) {
    this._password = password
    this.salt = uuidv1()
    this.hashed_password=this.encryptPassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods = {
    authenticate: function(plainText)
    {
        return this.encryptPassword(plainText)==this.hashed_password;
    },

    encryptPassword: function(password)
    {
        if(!password)
            return "";
        try 
        {
            return crypto.createHmac('sha1',this.salt)
            .update(password)
            .digest('hex');
        }
        catch(err)
        {
            return "";
        }
    }
}



module.exports = mongoose.model("Student", userSchema);