import faker from 'faker';
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

export const validCommentHistory = {
  articleSlug: 'How-to-use-the-faker-package-306a8a4c-57ee-4ac1-898d-cbca809e1e8d',
  userId: 5,
  commentId: 1,
  comment: 'comment test modified'
};

export const noUserId = {
  articleSlug: 'How-to-use-the-faker-package-306a8a4c-57ee-4ac1-898d-cbca809e1e8d',
  commentId: 1,
  comment: 'comment test modified'
};

export const noArticleSlug = {
  userId: 5,
  commentId: 1,
  comment: 'comment test modified'
};

export const noCommentId = {
  articleSlug: 'How-to-use-the-faker-package-306a8a4c-57ee-4ac1-898d-cbca809e1e8d',
  userId: 5,
  comment: 'comment test modified'
};

export const noComment = {
  articleSlug: 'How-to-use-the-faker-package-306a8a4c-57ee-4ac1-898d-cbca809e1e8d',
  userId: 5,
  commentId: 1
};

export const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'Password1!'
};

export const article = {
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  description: 'This is the description',
  tags: [],
  categoryId: 1
};

export const comment = {
  comment: 'I like this article',
};

export default getCommentHistory;
