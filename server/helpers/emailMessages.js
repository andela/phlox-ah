export default {
  /**
  * @description - This function contains the HTML verification email message
  * @param {string} username - The user username
  * @param {string} url - The url link to verify user account
  * @returns {html-string} - It returns an HTML String
  */
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

  /**
  * @description - This function contains the Text verification email message
  * @param {string} username - The user username
  * @param {string} url - The url link to verify user account
  * @returns {string} - It returns a string
  */
  verificationMessageText(username, url) {
    return `Hi, ${username}, Welcome to Author's Haven. Please copy this link into your browser url
    ${url} to verify your account`;
  }
};
