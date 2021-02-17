const nodemailer = require('nodemailer');
//var sgTransport = require('nodemailer-sendgrid-transport');
       // const defaultMailingList = "vrr.19u10276@btech.nitdgp.ac.in,vrrpriv@yahoo.com,himanshu.shekharjha.272@gmail.com,svs.harshith@gmail.com";
        module.exports = {
            sendMail: async (subject, text, to) => {
                try {
                    console.log("to ---"+ to)
                const transporter = nodemailer.createTransport({
                    host: "smtp.mailgun.org",
                    secure: true,
                    port: 465,
                    auth: {
                    user: process.env.MAILGUN_USER,
                    pass: process.env.MAILGUN_PASSWORD
                    },
                });

                transporter.verify(function(error, success) {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("Server is ready to take our messages");
                    }
                  });
                  

                const message = {
                    from: `GNU/Linux Users' Group <${process.env.MAILER}>`,
                    to:to,
                    subject:subject,
                    html: text,
                };

                transporter.sendMail(message, () => {});
                } catch (e) {
                    console.log(e)
                }
            },
        };