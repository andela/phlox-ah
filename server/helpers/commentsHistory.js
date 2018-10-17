import Model from '../models';

const {
  CommentsHistory, ArticleComment, Article, User
} = Model;

const getCommentHistory = (searchParams, res, successMessage, failedMessage) => {
  CommentsHistory.findAll({
    where: searchParams,
    order: [
      ['createdAt', 'DESC'],
    ],
    include: [{
      model: User,
      attributes: ['username', 'email']
    },
    {
      model: ArticleComment,
      attributes: ['comment']
    },
    {
      model: Article,
      attributes: ['title', 'body', 'description']
    }]
  })
    .then((histories) => {
      if (histories.length >= 1) {
        res.status(200).json({ success: true, message: successMessage, histories });
      } else if (histories.length <= 0) {
        res.status(200).json({ success: false, message: failedMessage });
      } else {
        res.status(404).json({ success: false, message: 'comment cannot be found' });
      }
    })
    .catch(error => res.status(500).json(error));
};

export default getCommentHistory;
