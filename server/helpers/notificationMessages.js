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
  commentNotification(url, commentersUsername) {
    return `
      <div>
      <h3>Hi,</h3>
      <p>${commentersUsername} just commented on an article you liked<br>
      <p><a href='${url}'>Link to article</a><p>
      <br/>
      `;
  },
};
