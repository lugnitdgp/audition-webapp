const nodemailer = require('nodemailer');
//var sgTransport = require('nodemailer-sendgrid-transport');
       // const defaultMailingList = "vrr.19u10276@btech.nitdgp.ac.in,vrrpriv@yahoo.com,himanshu.shekharjha.272@gmail.com,svs.harshith@gmail.com";
        module.exports = {
            sendMail: async (subject, text, to) => {
                try {
                    console.log("to ---"+ to)
                const transporter = nodemailer.createTransport({
                    host: "smtp.sendgrid.net",
                    secure: false,
                    port: 587,
                    auth: {
                    user: process.env.SENDGRID_USER,
                    pass: process.env.SENDGRID_API_KEY,
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
                    from: process.env.MAILER,
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