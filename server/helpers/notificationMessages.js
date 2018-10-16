export default {
  newArticleNotification(authorsUsername, url) {
    return `
      <div>
      <h3>Hi,</h3>
      <p>${authorsUsername} just added an article<br>
      <p><a href='${url}'>${url}</a><p>
      <br/>
      `;
  },
};
