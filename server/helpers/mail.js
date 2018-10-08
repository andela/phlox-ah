import sgMail from '@sendgrid/mail';

const sendMail = (options) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const mailMessage = {
    to: options.email,
    from: 'Author Haven <no-reply@authorshaven.com>',
    subject: options.subject,
    text: options.textMessage,
    html: options.htmlMessage,
  };
  sgMail.send(mailMessage);
};

export default sendMail;
