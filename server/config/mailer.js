const nodemailer = require('nodemailer');

const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'ubooking3@gmail.com',
        pass: 'kefzpojxzxgiflqf'
    }
})

module.exports = mailTransporter
