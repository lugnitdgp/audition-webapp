const nodemailer = require('nodemailer');
       // const defaultMailingList = "vrr.19u10276@btech.nitdgp.ac.in,vrrpriv@yahoo.com,himanshu.shekharjha.272@gmail.com,svs.harshith@gmail.com";
        module.exports = {
            sendMail: async (subject, text, to) => {
                try {
                    console.log("to ---"+ to)
                const transporter = nodemailer.createTransport({
                    host: "smtp.zoho.com",
                    secure: true,
                    port: 465,
                    auth: {
                    user: process.env.MAILER,
                    pass: process.env.MAILER_PWD,
                    },
                });

                const message = {
                    from: process.env.MAILER,
                    to:to,
                    subject:subject,
                    html: text,
                };

                transporter.sendMail(message, () => {});
                } catch (e) {
                    console.log("ffffffffffffffffffff   "+e)
                }
            },
        };