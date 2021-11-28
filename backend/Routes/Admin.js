const express = require('express'); 
const app=express();
const Admin = require('../Controllers/Admin')
const router = express.Router();
//Admin Signin
router.post('/adminsignin',Admin.signinAdmin)
module.exports = router
