const contactPageSchema = require("../Models/contactPageModel")

//create contact page
module.exports.createContactPage = async (req, res) => {
    try {
        const { email, location, phone } = req.body;
        if (!email || !location || !phone) {
            return res.status(400).send({
                success: false,
                message: "please provide all fields",
            });
        }
        const ContactFormDetails = new contactPageSchema({ email, location, phone })
        console.log(ContactFormDetails);
        await ContactFormDetails.save();
        return res.status(201).send({
            success: true,
            message: "Contact page created successfully",
            ContactFormDetails,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send({
            success: false,
            message: "An error occurred",
        });
    }
}

//update conatcts
module.exports.updateContactPage = async (req, res) => {
    const id = req.params.id;
    const { email, location, phone } = req.body;
    try {
        const updatedContact = await contactPageSchema.findByIdAndUpdate(id,
            { email, location, phone },
            { new: true }
        );
        if (!updatedContact) {
            return res.status(404).json({ error: "ContactPage not found" });
        }
        res.status(200).json({ message: "Contact Page updated successfully", Contact: updatedContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
}

//get contact pages
module.exports.getContactPage=async(req,res)=>{
        try {
            const getContact = await contactPageSchema.find({})
            res.status(200).json(getContact)
        } catch (error) {
            res.status(500).json({ error: "Error fetching all contacts" })
        }
    }
    