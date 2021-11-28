const express = require('express'); 
const app=express();
const Auth = require('../Controllers/Auth');
const router = express.Router();
router.get('/signout',Auth.signout); // SIGNOUT AND CLEAR LOCAL STORAGE
module.exports = router
