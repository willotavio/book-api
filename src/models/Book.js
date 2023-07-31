const mongoose = require('mongoose');

const bookModel = mongoose.model('Book', {
    title: { type: String, required: true },
    synopsis: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true}
});

module.exports = bookModel;