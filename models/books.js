const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookId:{
        type: Number
    },
    title: {
        type: String
    },
    genre: {
        type: String
    },
    author: {
        type: String
    },
    read: {
        type: Boolean
    }
});
const Books = mongoose.model('Books', bookSchema);
module.exports = Books;