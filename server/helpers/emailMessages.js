export default {
  resetPassMessageHtml(username, url) {
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

  resetPassMessageText(username, url) {
    return `
    Hi ${username},
    You are receiving this because you have requested a password reset
    Please click the link below or copy and paste it in your browser.
    <a href="${url}">${url}</a>
    If you did not request this, Please ignore this mail, your password will remain unchanged
    `;
  },

  verificationMessageHtml(username, url) {
    return `
    <div>
      <h3>Hi ${username},</h3>
      <p>Welcome to Author's Haven, thanks for signing up, let's get you connected with great minds, But first activate your account by
          clicking on this link
          <br />
          <br />
          <br />
          <a href="${url}"
          style="border: 1px solid light-blue; background-color: blue; padding: 10px;
          color: #fff; border-radius:10px; text-decoration: none" > Verify Account
          <a>
      </p>
      <p>
        If you can't click the above link button, please copy this link into your browser url
        <br />
        ${url}
      </p>
    </div>`;
  },

  verificationMessageText(username, url) {
    return `Hi, ${username}, Welcome to Author's Haven. Please copy this link into your browser url
    ${url} to verify your account`;
  },
};
