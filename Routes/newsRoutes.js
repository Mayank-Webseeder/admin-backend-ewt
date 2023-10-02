const express= require("express")
const router= express.Router();
const {Newsletter,getNewsletter} = require("../controllers/newsController")

router.post('/create-newsletter',Newsletter)
router.get("/get-newsletter",getNewsletter)

module.exports=router;