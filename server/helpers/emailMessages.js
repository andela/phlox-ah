export default {
  verificationMessageHTML(username, url) {
    return `
    <div>
      <h3>Hi ${username},</h3>
      <p>Welcome to Author's Haven, we extend our gratitude to
          have you on our platform, But to activate your account please
          click on this link
          <br />
          <br />
          <br />
          <a href="${url}"
          style="border: 1px solid light-blue; background-color: blue; padding: 10px;
          color: #fff; border-radius:10px; text-decoration: none" > Verify Account
          <a>
      </p>
      <br />
      <p>
        If you can't click the above link button, please copy this link into your browser url
        <br />
        ${url}
      </p>
    </div>`;
  },

  verificationMessageTEXT(username, url) {
    return `Hi, ${username}, Welcome to Author's Haven. Please copy this link into your browser url
    ${url} to verify your account`;
  }
};
