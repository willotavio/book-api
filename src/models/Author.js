const mongoose = require('mongoose');

const authorModel = mongoose.model('Author', {
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true }
});

module.exports = authorModel;