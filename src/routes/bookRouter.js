const router = require('express').Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.findBooks);
router.get('/:bookId', bookController.findBookById);
router.post('/', bookController.addBook);
router.put('/:bookId', bookController.updateBook);
router.delete('/:bookId', bookController.deleteBook);

module.exports = router;