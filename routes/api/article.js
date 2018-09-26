const router = require("express").Router();
let articleController = require('./../../controllers').articles;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json('welcome Author Haven');
});

/* Create article route */
router.post('/article', articleController.create);


module.exports = router;
