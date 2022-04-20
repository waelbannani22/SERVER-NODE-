const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    let testAccount = await nodemailer.createTestAccount();
   // console.log(testAccount)
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
           
            port: 587,
            secure: false,
            auth: {
                user: "allwebsiteinone@gmail.com",
                pass: "allinone123",
            },
        });

        await transporter.sendMail({
            from: email,
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