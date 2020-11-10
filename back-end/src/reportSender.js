const nodemailer = require('nodemailer');
       // const defaultMailingList = "vrr.19u10276@btech.nitdgp.ac.in,vrrpriv@yahoo.com,himanshu.shekharjha.272@gmail.com,svs.harshith@gmail.com";
        module.exports = {
            sendMail: async (subject, text, to) => {
                try {
                    console.log("to ---"+ to)
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                    user: process.env.MAILER,
                    pass: process.env.MAILER_PWD,
                    },
                });

                const message = {
                    from: `The GNU/Linux User's  Group, NIT Durgapur`,
                    to,
                    subject,
                    text: subject,
                    html: text,
                };

                transporter.sendMail(message, () => {});
                } catch (e) {
                    console.log("ffffffffffffffffffff   "+e)
                }
            },
        };