const router = require('express').Router();
const Author = require('../models/Author');
const authorController = require('../controllers/authorController');

router.get('/', authorController.findAuthors);
router.get('/:authorId', authorController.findAuthorById);
router.post('/', authorController.addAuthor);
router.delete('/:authorId', authorController.deleteAuthor);

module.exports = router;