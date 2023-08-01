const Author = require('../models/Author');

class authorService{

    async findAuthors(){
        const authors = await Author.find();
        return {status: true, authors};
    }

    async findAuthorById(authorId){
        try{
            const author = await Author.findById(authorId);
            if(author){
                return {status: true, author};
            }
            else{
                return {status: false, message: "Author not found"};
            }
        }
        catch(err){
            return {status: false, message: "Author not found"};
        }
    }

    async addAuthor(name, dateOfBirth){
        let dob = Date.parse(dateOfBirth);
        const author = {
            name,
            dateOfBirth: dob
        }
        try{
            await Author.create(author);
            return {status: true};
        }
        catch(err){
            console.log(err);
            return {status: false, message: err};
        }
    }

    async deleteAuthor(authorId){
        try{
            const result = await Author.findByIdAndDelete(authorId);
            if(result){
                return {status: true};
            }
            else{
                return {status: false, message: "Author not found"};
            }
        }
        catch(err){
            return {status: false, message: "Author not found"};
        }
    }

    async updateAuthor(authorId, name, dateOfBirth){
        const author = {}
        if(name){
            author.name = name;
        }
        if(dateOfBirth){
            const dob = Date.parse(dateOfBirth);
            author.dateOfBirth = dob;
        }
        try{
            const authorExists = await Author.findByIdAndUpdate(authorId, author);
            if(authorExists){
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

module.exports = new authorService();