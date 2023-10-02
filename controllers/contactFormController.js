const nodemailer = require('nodemailer');
const ContactFrom = require("../Models/contactFormModel")

//create-contacts
module.exports.Contacts = async (req, res) => {
    try {
        const { name, phone, location, email, message } = req.body;
        if (!name || !phone || !location || !email) {
            return res.status(400).send({
                success: false,
                message: "please provide all fields",
            });
        }
        const contactDetails = new ContactFrom({ name, phone, location, email, message });
        console.log(contactDetails);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "webseedercrm@gmail.com",
                pass: "acdybunsvnbweqtl",
            },
        });

        const mailOptions = {
            from: 'sheetalraghav068@gmail.com',
            to: email,
            subject: 'New Contact Created',
            text: `Name: ${name}\nPhone: ${phone}\nLocation: ${location}\n\nThank you for contacting us! We will get back to you soon.`,

        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        await contactDetails.save();
        return res.status(201).send({
            success: true,
            message: "Contact form created successfully",
            contactDetails,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send({
            success: false,
            message: "An error occurred",
        });
    }
};


//get all conatcts
module.exports.allContacts = async (req, res) => {
    try {
 //name ,,phone,location
        const allContacts = await ContactFrom.find({})
        res.status(200).json(allContacts)
    } catch (error) {
        res.status(500).json({ error: "Error fetching all contacts" })
    }
}

//delete contacts
module.exports.deleteContact = async (req, res) => {
    try {
        const ContactId = req.params.id;
        const deletedContact = await ContactFrom.findByIdAndDelete(ContactId);
        if (!deletedContact) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully', Contact: deletedContact });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
