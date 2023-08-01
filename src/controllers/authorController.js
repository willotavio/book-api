const authorService = require('../services/authorService');

class authorController{

    async findAuthors(req, res){
        const authors = await authorService.findAuthors();
        res.status(200).json(authors.authors);
    }

    async findAuthorById(req, res){
        const { authorId } = req.params;
        if(authorId){
            const result = await authorService.findAuthorById(authorId);
            if(result.status){
                res.status(200).json(result.author);
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
            const result = await authorService.addAuthor(name, dateOfBirth);
            if(result.status){
                res.sendStatus(200);
            }
            else{
                res.sendStatus(500);
            }
        }
        else{
            res.sendStatus(400);
        }
    }

    async updateAuthor(req, res){
        const { authorId } = req.params;
        const { name, dateOfBirth } = req.body;
        if(authorId){
            const result = await authorService.updateAuthor(authorId, name, dateOfBirth);
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

    async deleteAuthor(req, res){
        const { authorId } = req.params;
        if(authorId){
            const result = await authorService.deleteAuthor(authorId);
            if(result.status){
                res.sendStatus(200);
            }
            else{
                res.sendStatus(404);
            }
        }
        else{
            res.sendStatus(400)
        }
    }

}

module.exports = new authorController();