const express = require('express'); 
const app = express();
const HW=require('../Controllers/HW')
const router = express.Router();
router.post('/workshopsofhub', HW.workshopsofHub) // FETCH WORKSHOPS OF HUBS
router.post('/coordinatorsofhub',HW.coordinatorsofHub) // FETCH COORDINATORS OF HUB
router.post('/workshop', HW.workshopById) // FETCH WORKSHOP BY ID
router.post('/fieldupdateworkshop', HW.workshopEnableDisable) // UPDATE CERTAIN FIELDS LIKE VARUIOUS FORUM AND PERMISSION
router.put('/editworkshop', HW.updateWorkshop) // EDIT WORKSHOP DETAILS
router.post('/addhub',HW.createHub) // CREATE HUB
router.get('/allhubs', HW.allHubs) // FETCH ALL HUBS
router.post('/addworkshop', HW.createWorkshop) // CREATE WORKSHOP
module.exports = router