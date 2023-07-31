const Author = require('../models/Author');

class authorController{

    async findAuthors(req, res){
        const authors = await Author.find();
        res.status(200).json(authors);
    }

    async findAuthorById(req, res){
        const { authorId } = req.params;
        if(authorId){
            const author = await Author.findById(authorId);
            if(author){
                res.status(200).json(author);
            }
            else{
                res.sendStatus(404);
            }
        }
        else{
            res.sendStatus(400);
        }
    }
    
    async addAuthor(req, res){
        const { name, dateOfBirth } = req.body;
        if(name && dateOfBirth){
            let dob = Date.parse(dateOfBirth);
            const author = {
                name,
                dateOfBirth: dob
            }
            try{
                await Author.create(author);
                res.sendStatus(200);
            }
            catch(err){
                console.log(err);
                res.sendStatus(500);
            }
        }
        else{
            res.sendStatus(400);
        }
    }

    async deleteAuthor(req, res){
        const { authorId } = req.params;
        if(authorId){
            try{
                const exists = await Author.findByIdAndDelete(authorId);
                if(exists){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }
            catch(err){
                res.sendStatus(500);
            }
        }
        else{
            res.sendStatus(400)
        }
    }

}

module.exports = new authorController();