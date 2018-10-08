export default {
  resetPasswordMessageHtml(username, url) {
    return `
    <div>
    <h3>Hi ${username},</h3>
    <p>You are receiving this because you have requested a password reset <br>
    Please click the link below or copy and paste it in your browser.</p>
    <br/>
    <a href="${url}">${url}</a>
    <p>If you did not request this, Please ignore this mail, your password will remain unchanged</p>
    </div>
    <p>This password expires after 10 minutes</p>
    `;
  },
  resetPasswordMessageText(username, url) {
    return `
    Hi ${username},
    You are receiving this because you have requested a password reset
    Please click the link below or copy and paste it in your browser.
    <a href="${url}">${url}</a>
    If you did not request this, Please ignore this mail, your password will remain unchanged
    `;
  }
};
