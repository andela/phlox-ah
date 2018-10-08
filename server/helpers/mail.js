import sgMail from '@sendgrid/mail';

const sendMail = (options) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const mailMessage = {
    to: options.to,
    from: 'no-reply@authorshaven.com',
    subject: options.subject,
    text: options.text,
    html: options.html,
  };
  sgMail.send(mailMessage);
};

export default sendMail;
