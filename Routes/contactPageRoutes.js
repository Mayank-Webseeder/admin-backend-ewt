const express= require("express")
const router= express.Router();
const { 
    createContactPage,
    updateContactPage,
    getContactPage
} = require("../controllers/contactPageController")

router.post("/create-contactpage",createContactPage)   //create contact
router.patch("/update-contactpage/:id",updateContactPage)  //update contact
router.get("/get-contactpage",getContactPage) //get 

module.exports = router;

//form :name,email,phone,location,message  post,get
//page:email,phone,location      post,get,update