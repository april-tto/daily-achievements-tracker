const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
    }
})

async function sendEmail(to, subject, message) {
    let recipientEmail;
    let emailSubject;
    let emailMessage;

    if (to.email) { recipientEmail = to.email }
    else { throw new Error("Recepient's email was not provided") };
    if (subject) { emailSubject = subject }
    else { throw new Error("Email subject was not provided") };
    if (subject) { emailMessage = message }
    else { throw new Error("Email message was not provided") };

    transporter.sendMail({
        from: process.env.GOOGLE_EMAIL,
        to: recipientEmail,
        subject: emailSubject,
        text: `${emailMessage}: ${to.otp}`
    }, (err) => {
        if (err) return console.log(err);
        else return true;
    })
}

module.exports = { sendEmail }; 