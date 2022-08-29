const { Router } = require("express");
const { getTrip, postTrip } = require("../controllers/trip");


const router = Router();

router.get('/',[],getTrip);
router.post('/',[], postTrip);


module.exports = router;