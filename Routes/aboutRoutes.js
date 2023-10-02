
const express = require('express');
const router = express.Router();
const {
    createAbout,
    getAbout,
    updateAbout,


} = require("../controllers/aboutController")

router.post('/create-about-page', createAbout); // create
router.get('/about-page', getAbout);    //get 
router.put('/update-about-page/:id', updateAbout);  ///update
// router.delete('/delete-about-page/:id', deleteAbout); //delete

module.exports = router;



