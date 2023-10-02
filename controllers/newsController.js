const nodemailer=require("nodemailer")
const News=require("../Models/newsModel")

//create
module.exports.Newsletter = async (req, res) => {
    try {
        const {email,name } = req.body;
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "please provide all fields",
            });
        }
        const newsletter = new News({ email });
        console.log(newsletter);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "webseedercrm@gmail.com",
                pass: "acdybunsvnbweqtl",
            },
        });
        const mailOptions = {
            from:'webseedercrm@gmail.com',
            to:email,
            subject:'Subscribe to our newsletter',
            text:`hi, ${email} Thank you for subscribing to our newsletter. You will receive updates on the latest news and offers`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        await newsletter.save();
        return res.status(201).send({
            success: true,
            message: "newsletter created successfully",
            newsletter,
        });
    }catch (error) {
        console.error('Error:', error);
        return res.status(500).send({
            success: false,
            message: "An error occurred",
        });
    }
};

module.exports.getNewsletter = async (req, res) => {
    try {
        const newsletter= await News.find({})
        res.status(200).json(newsletter)
    } catch (error) {
        res.status(500).json({ error: "Error fetching newsletter" })
    }
}


