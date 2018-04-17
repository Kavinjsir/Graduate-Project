const nodemailer = require('nodemailer');

module.exports = (account, message) => {
  const {host, user, pass } = account;
  const { to, subject, text } = message;
  // nodemailer initialization
  const transporter = nodemailer.createTransport({
    host,
    port: 587,
    auth: {
      user,
      pass,
    }
  });

  const mailOptions = {
    from: '"Tony King 👻" <1963465249@qq.com>',
    to,
    subject,
    text,
    html: '<p>' + text + '</p>'
  }

  return transporter.sendMail(mailOptions);
}