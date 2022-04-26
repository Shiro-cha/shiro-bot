const express = require("express");

let router = express.Router();
let admin = require("../controllers/admin/index");

router.get("/",admin.get_page);




module.exports = router;
