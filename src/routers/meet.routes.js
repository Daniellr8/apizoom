const {Router} = require("express");
const router = Router();
const meetCtr = require("../controllers/meet.controller");



router.post("/create_meet", meetCtr.createMeet)


router.get("/read_meet", meetCtr.readMeet)


module.exports = router;