const express = require('express')
const app = express()
const port = 3000
const nodemailer = require('nodemailer')
const SMTPConnection = require("nodemailer/lib/smtp-connection");
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/mail', async (req, res) => {

    const mailTransport = nodemailer.createTransport({
        host: "smtpout.asia.secureserver.net",
        secure: true,
        port: 465,
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });

    const mailOptions = {
        from: process.env.user,
        to: 'vikashchandramishra412@gmail.com',
        subject: 'This is a Test Subject',
        html: '<h1>Hi Bharat</h1>',

    };


    mailTransport.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take our messages');
        }
    });

    mailTransport.sendMail(mailOptions).then(() => {
        console.log('Email sent successfully');
    }).catch((err) => {
        console.log('Failed to send email');
        console.error(err);
    });


    res.send('Email')

})

app.get('/email', (req, res) => {

    let options = {
        port: 465,
        secure: true,
        host: 'smtpout.secureserver.net',
    }

    let envelope = {
        from: process.env.user,
        to: 'crimsonsyrus000@gmail.com'
    }

    let message = 'Testing';

    let connection = new SMTPConnection(options);

    connection.connect(() => {
        console.log("Connected")
    });

    connection.login({
        credentials : {
            user: process.env.user,
            pass: process.env.pass
        }
    }, (err) => {
        console.log(err);
    });

    connection.send(envelope, message, (err) => {
        console.log(err)
    });

    connection.quit();

    res.send('Hello')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})