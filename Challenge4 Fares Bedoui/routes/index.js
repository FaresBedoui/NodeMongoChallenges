var express = require ("express");
const {Send} = require ("../controllers/users.controller.js");
var router = express.Router();

/*GET home page */
router.post("/confirm", Send);

module.exports = router;