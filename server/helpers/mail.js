import sgMail from '@sendgrid/mail';

/**
  * @description - This function use to send mail
  * @param {object} options - This contains where the mail will be sent to (user mail),
  * subject of the mail, the html and text version of the mail content
  * @returns {void} - This function doesn't return any value
  */
const sendMail = (options) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const mailMessage = {
    from: 'Authors Haven <no-reply@authorshaven.com>',
    to: options.email,
    subject: options.subject,
    text: options.textMessage,
    html: options.htmlMessage,
  };

  sgMail.send(mailMessage);
};

export default sendMail;
