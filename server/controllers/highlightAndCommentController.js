import Model from '../models';

const { HighlightAndComment, Article } = Model;
/**
  * @class TagController
  * @description CRUD operations on Article
  */
export default class HighlightAndCommentController {
  /**
  * @description -This method adds a bookmark for an authenticated user
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and highlight detail
  */
  static saveComment(req, res) {
    const { selectedText, comment } = req.body;
    const { articleSlug } = req.params;
    Article.findOne({
      where: { slug: articleSlug },
    }).then((article) => {
      if (!article) {
        res.status(404).json({ message: 'article does not exist', success: false });
      } else if (article.body.includes(selectedText)) {
        HighlightAndComment.findOrCreate({
          where: {
            articleSlug,
            selectedText,
            comment,
            userId: req.user.id
          },
          attributes: ['userId', 'articleSlug', 'selectedText', 'comment']
        })
          .spread((highlightComment, created) => {
            if (!created) {
              res.status(409).json({ success: false, message: 'Text has already been highlighted', highlightComment });
            } else {
              res.status(201).json({ success: true, message: 'Text has been highlighted', highlightComment });
            }
          });
      } else {
        res.status(404).json({ message: 'selected text cannot be found in the article', success: false });
      }
    });
  }

  /**
  * @description -This method adds a bookmark for an authenticated user
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and highlight detail
  */
  static editComment(req, res) {
    const { selectedText, comment } = req.body;
    const { articleSlug } = req.params;
    HighlightAndComment.findOne({
      where: {
        // selectedText, articleSlug, userId: req.user.id, id: req.params.highlightCommentId
        selectedText, articleSlug, userId: req.user.id, id: req.params.highlightCommentId
      },
    }).then((highlight) => {
      if (!highlight) {
        res.status(404).json({ message: 'highlight does not exist', success: false });
      } else {
        highlight.update({
          selectedText, articleSlug, comment, userId: req.user.id
        })
          .then((updatedHighlightComment) => {
            res.status(200).json({ success: true, message: 'Text comment has been changed', updatedHighlightComment });
          })
          .catch(error => res.status(500).json(error));
      }
    });
  }

  /**
  * @description -This method adds a bookmark for an authenticated user
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and highlight detail
  */
  static deleteComment(req, res) {
    const { articleSlug } = req.params;
    HighlightAndComment.findOne({
      where: { articleSlug, id: req.params.highlightCommentId, userId: req.user.id },
    }).then((highlight) => {
      if (!highlight) {
        res.status(404).json({ message: 'highlight does not exist', success: false });
      } else {
        highlight.destroy()
          .then(() => {
            res.status(204).end();
          })
          .catch(error => res.status(500).json(error));
      }
    });
  }
}
