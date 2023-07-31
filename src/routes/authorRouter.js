const router = require('express').Router();
const Author = require('../models/Author');

router.get('/', async (req, res) => {
    const authors = await Author.find();
    res.status(200).json(authors);
});

router.post('/', async (req, res) => {
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
});

module.exports = router;