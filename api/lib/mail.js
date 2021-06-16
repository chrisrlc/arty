require('dotenv').config()
const mailer = require('nodemailer')

async function sendMail (email, subject, msg) {
  // TODO: Do I need to create a new transport every time I send mail, or can I just create it once?
  const transporter = mailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  }, {
    from: process.env.MAIL_FROM
  })

  await transporter.sendMail({
    to: email,
    subject: subject,
    text: msg,
    html: msg
  })
}

module.exports = {
  sendMail
}
