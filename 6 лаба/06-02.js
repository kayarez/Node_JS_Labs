const sendmail = require('nodemailer');

function simpleSend(text) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = sendmail.createTestAccount();

    let transporter = sendmail.createTransport(
        {
            service: 'mail.ru',
            auth: {
                user: 'diana.vupsen', // generated ethereal user
                pass: "Primitekursach" // generated ethereal password
            }
        });

    let info = transporter.sendMail(
        {
            from: '"Im"<diana.vupsen@mail.ru>', // sender address
            to: 'diana.vupsen@mail.ru', // list of receivers
            subject: 'Katya', // Subject line
            text: text, // plain text body
            html: text // html body
        });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', sendmail.getTestMessageUrl(info));
}

function customSend(from, to, pass, text) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = sendmail.createTestAccount();

    let transporter = sendmail.createTransport(
        {
            service: 'mail.ru',
            auth: {
                user: from, // generated ethereal user
                pass: pass // generated ethereal password
            }
        });
    let info = transporter.sendMail(
        {
            from: '<' + from + '>', // sender address
            to: to, // list of receivers
            text: text, // plain text body
            html: text // html body
        })

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', sendmail.getTestMessageUrl(info));
}

module.exports.customSend = customSend;
module.exports.simpleSend = simpleSend;
