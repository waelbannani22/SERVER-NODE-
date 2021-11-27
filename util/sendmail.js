const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.example.com',
           
            port: 587,
            secure: true,
            auth: {
                user: 'wael.bannani@esprit.tn',
                pass: 'bB2227804400bB22',
            },
        });

        await transporter.sendMail({
            from: 'wael.bannani@esprit.tn',
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;