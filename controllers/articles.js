const Article = require('../models').Article;

/* Create an Article, then return the newly created article */
module.exports = {
  create(req, res) {
    return Article
      .create({
        title: req.body.title,
        content: req.body.content
      })
      .then(article => res.status(201).send(article))
      .catch(error => res.status(400).send(error));
  },
};