export default {
  newArticleNotification(authorsUsername, url, title) {
    return `
      <div>
      <h3>Hi,</h3>
      <p>${authorsUsername} just added an article<br>
      <p><a href='${url}'>${title}</a><p>
      <br/>
      `;
  },
};
