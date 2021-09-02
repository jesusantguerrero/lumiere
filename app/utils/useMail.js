const nodemailer = require("nodemailer");

const { defaultConfig } = require("../config");

exports.useMail = () => {
    const transporter = nodemailer.createTransport({
        host: defaultConfig.mailHost,
        port: defaultConfig.mailPort,
        secure: defaultConfig.mailSecure, // true for 465, false for other ports
        auth: !defaultConfig.mailUser ? null : {
            user: defaultConfig.mailUser, // generated ethereal user
            pass: defaultConfig.mailPass, // generated ethereal password
        },
    });

    const send = (email, subject, message, html) => {
        // send mail with defined transport object
        return transporter.sendMail({
            from: defaultConfig.mailFrom,
            to: email,
            subject: subject,
            text: message, 
            html: html
        });
    }


    return {
        send
    }
}