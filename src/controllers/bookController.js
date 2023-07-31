const Book = require('../models/Book');
const Author = require('../models/Author');

class bookController{

    async findBooks(req, res){
        const books = await Book.find();
        res.status(200).json(books);
    }

    async findBookById(req, res){
        const { bookId } = req.params;
        if(bookId){
            try{
                const book = await Book.findById(bookId);
                if(book){
                    res.status(200).json(book);
                }
                else{
                    res.sendStatus(404);
                }
            }
            catch(err){
                res.sendStatus(404);
            }
        }
        else{
            res.sendStatus(400);
        }
    }

    async addBook(req, res){
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
    }

    async updateBook(req, res){
        const { bookId } = req.params;
        const { title, synopsis, releaseDate, authorId } = req.body;

        if(bookId){
            try{
                await Book.findById(bookId);
    
                const book = {}
    
                if(authorId){
                    try{
                        const authorExists = await Author.findById(authorId);
                        book.author = authorExists;
                    }
                    catch(err){
                        res.status(404).json({message: "Author not found"});
                        return;
                    }
                }
                if(title){
                    book.title = title;    
                }
                if(synopsis){
                    book.synopsis = synopsis;
                }
                if(releaseDate){
                    let rDate = Date.parse(releaseDate);
                    book.releaseDate = rDate;
                }
    
                try{
                    await Book.findByIdAndUpdate(bookId, book);
                    res.sendStatus(200);
                }
                catch(err){
                    res.sendStatus(500);
                }
    
            }
            catch(err){
                res.status(404).json({message: "Book not found"});
                return;
            }
        }
        else{
            res.sendStatus(400);
        }

    }

    async deleteBook(req, res){
        const { bookId } = req.params;
        if(bookId){
            try{
                const exists = await Book.findByIdAndDelete(bookId);
                if(exists){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }
            catch(err){
                res.sendStatus(404);
            }
        }
        else{
            res.sendStatus(400);
        }
    }

}

module.exports = new bookController();