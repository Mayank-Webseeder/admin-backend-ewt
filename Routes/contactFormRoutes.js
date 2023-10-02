const express= require("express")
const router= express.Router();

const {
    Contacts,
    allContacts,
    deleteContact
} = require("../controllers/contactFormController")

router.post("/add-contacts",Contacts)   //create contact
router.get("/all-contacts",allContacts) //all conatcts
router.delete("/delete-contact/:id",deleteContact) //delete contacts

module.exports= router;