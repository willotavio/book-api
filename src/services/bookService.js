const Book = require('../models/Book');
const authorService = require('../services/authorService');

class bookService{

    async findBooks(){
        const books = await Book.find();
        return {status: true, books};
    }

    async findBookById(bookId){
        try{
            const book = await Book.findById(bookId);
            if(book){
                return {status: true, book};
            }
            else{
                return {status: false};
            }
        }
        catch(err){
            return {status: false};
        }
    }

    async addBook(title, synopsis, releaseDate, authorId){
        let authorExists = await authorService.findAuthorById(authorId);
        if(authorExists.status){
            let rDate = Date.parse(releaseDate);
            let book = {
                title,
                synopsis,
                releaseDate: rDate,
                author: authorExists.author
            }
            try{
                await Book.create(book);
                return {status: true};
            }
            catch(err){
                console.log(err);
                return {status: false};
            }
        }
        else{
            return {status: false, message: authorExists.message};
        }
    }

    async updateBook(bookId, title, synopsis, releaseDate, authorId){
        const bookExists = await this.findBookById(bookId);
        if(bookExists.status){
            const book = {}
            if(authorId){
                const authorExists = await authorService.findAuthorById(authorId);
                if(authorExists.status){
                    book.author = authorExists.author;
                }
                else{
                    return {status: false, message: "Author not found"};
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
                return {status: true};
            }
            catch(err){
                return {status: false};
            }
        }
        else{
            return {status: false, message: "Book not found"};
        }
    }

    async deleteBook(bookId){
        try{
            const exists = await Book.findByIdAndDelete(bookId);
            if(exists){
                return {status: true};
            }
            else{
                return {status: false};
            }
        }
        catch(err){
            return {status: false};
        }
    }

}

module.exports = new bookService();