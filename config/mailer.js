const nodemailer = require('nodemailer'); // using nodemailer

// Create a transporter using SMTP or other transport options
const transporter = nodemailer.createTransport({ // creating a transport with service and login of mail
    service: 'gmail',
    auth: {
        user: 'johndoe@gmail.com',
        pass: 'password1234',
    },
});

// Send mail function
const sendMail = async (to, subject, text) => { // sendMail function
    try {
        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'johndoe@gmail.com',
            to,
            subject,
            text,
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendMail };