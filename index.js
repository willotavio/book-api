const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const mongoose = require('mongoose');
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASS = process.env.MONGODB_PASS;
const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@tibeckstao.fbl1vyz.mongodb.net/book-api?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (req, res) => {
    res.json({cu: "cu"});
});

const authorRouter = require('./src/routes/authorRouter');
app.use('/author', authorRouter);

const bookRouter = require('./src/routes/bookRouter');
app.use('/book', bookRouter);

app.listen(3000, () => {
    console.log("API Running");
});