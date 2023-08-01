const bookService = require('../services/bookService');

class bookController{

    async findBooks(req, res){
        const books = await bookService.findBooks();
        res.status(200).json(books.books);
    }

    async findBookById(req, res){
        const { bookId } = req.params;
        if(bookId){
            const book = await bookService.findBookById(bookId);
            if(book.status){
                res.status(200).json(book.book);    
            }
            else{
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
            const result = await bookService.addBook(title, synopsis, releaseDate, authorId);
            if(result.status){
                res.sendStatus(201);
            }
            else if(result.message){
                res.status(404).json(result.message);
            }
            else{
                res.sendStatus(500);
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
            const result = await bookService.updateBook(bookId, title, synopsis, releaseDate, authorId);
            if(result.status){
                res.sendStatus(200);
            }
            else if(result.message){
                res.status(404).json(result.message);
            }
            else{
                res.sendStatus(500);
            }
        }
        else{
            res.sendStatus(400);
        }

    }

    async deleteBook(req, res){
        const { bookId } = req.params;
        if(bookId){
            const result = await bookService.deleteBook(bookId);
            if(result.status){
                res.sendStatus(200);
            }
            else{
                res.sendStatus(404);
            }
        }
        else{
            res.sendStatus(400);
        }
    }

}

module.exports = new bookController();