const router = require('express').Router();
const Book = require('../models/Book');
const Author = require('../models/Author');

router.get('/', async (req, res) => {
    const books = await Book.find();
    res.status(200).json(books);
});

router.post('/', async (req, res) => {
    const { title, synopsis, releaseDate, authorId } = req.body;
    if(title && synopsis && releaseDate && authorId){
        let authorExists = await Author.findById(authorId);
        if(authorExists){
            let rDate = Date.parse(releaseDate);
            let book = {
                title,
                synopsis,
                releaseDate: rDate,
                author: authorExists
            }
            try{
                await Book.create(book);
                res.sendStatus(201);
            }
            catch(err){
                console.log(err);
                res.sendStatus(500);
            }
        }
        else{
            res.status(404).json({message: "Author not found"});
        }
    }
    else{
        res.sendStatus(400);
    }
});

module.exports = router;