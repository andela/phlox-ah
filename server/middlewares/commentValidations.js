
/**
 * @description -This method brings together data from req.body, req.user and req.params
 * @param {object} req - The request payload sent from the router
 * @returns {object} - new object of relevant data
 */
export default {

  isValidData(req, res, next) {
    if (!req.body.comment) {
      return res.status(400).json({ error: 'Comment is required' });
    }

    if (typeof req.body.comment !== 'string') {
      return res.status(400).json({ error: 'Comment must be of type string' });
    }

    if (req.body.comment.length < 2) {
      return res.status(400).json({ error: 'Comment length must not be less than two' });
    }

    next();
  }

};
