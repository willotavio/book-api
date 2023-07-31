const router = require('express').Router();
const authorController = require('../controllers/authorController');

router.get('/', authorController.findAuthors);
router.get('/:authorId', authorController.findAuthorById);
router.post('/', authorController.addAuthor);
router.put('/:authorId', authorController.updateAuthor);
router.delete('/:authorId', authorController.deleteAuthor);

module.exports = router;