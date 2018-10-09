
export default {

  /**
  * @description -This method brings together data from req.body, req.user and req.params
  * @param {object} req - The request payload sent from the router
  * @returns {object} - new object of relevant data 
  */
  commentDetail(req) {
    const data = Object.assign(
      {},
      req.body, 
      {
        userId: req.user.id, 
        articleSlug: req.params.articleSlug,
        commentId: req.params.commentId,
      },
    );

    return data;
  },

  /**
  * @description -This method brings together data from req.body, req.user and req.params
  * @param {object} req - The request payload sent from the router
  * @returns {object} - new object of relevant data 
  */
  replyCommentDetail(req) {
    const data = Object.assign(
      {}, 
      req.body, 
      {
        userId: req.user.id, 
        articleSlug: req.params.articleSlug, 
        commentId: req.params.commentId,
        replyCommentId: req.params.replyCommentId,
      }
    );

    return data;
  }

}

