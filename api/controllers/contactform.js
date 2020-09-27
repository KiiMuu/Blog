const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

exports.contactForm = (req, res, next) => {
    const { name, email, message } = req.body;

    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
            <h4>Email recieved from contact form</h4>
            <p>Sender name: ${name}</p>
            <p>Sender email: ${email}</p>
            <p>Sender message: ${message}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://bloggawy.com</p>
        `

        let transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            port: 123,
            secure: true,
            auth: {
                user: `${process.env.EMAIL_TO}`,
                pass: "Karim604050@FCIHGMAIL"
            }
        }));

        let mailOptions = {
            from: email,
            to: process.env.EMAIL_TO,
            subject: `Contact Form - ${process.env.APP_NAME}`,
            text: message,
            html: htmlEmail
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(400).json({ 
                    errors: [{ 
                        msg: err 
                    }] 
                });
            }

            res.json({ 
                msg: 'Message sent'
            });
        });
    });
}

exports.contactBlogAuthor = (req, res, next) => {
    const { authorEmail, name, email, message } = req.body;

    let mailList = [authorEmail, process.env.EMAIL_TO];

    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
            <h4>Message recieved from:</h4>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://bloggawy.com</p>
        `

        let transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            port: 123,
            secure: true,
            auth: {
                user: `${process.env.EMAIL_TO}`,
                pass: "Karim604050@FCIHGMAIL"
            }
        }));

        let mailOptions = {
            from: email,
            to: mailList,
            subject: `Someone messaged you from ${process.env.APP_NAME}`,
            text: message,
            html: htmlEmail
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(400).json({ 
                    errors: [{ 
                        msg: err 
                    }] 
                });
            }

            res.json({ 
                msg: 'Message sent'
            });
        });
    });
}