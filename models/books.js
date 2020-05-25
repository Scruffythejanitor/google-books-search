const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GoogleBookSchema = new Schema({
    name: String,
    authors: Array,
    description: String,
    image: String,
    link: String
});

const GoogleBook = mongoose.model('GoogleBook', GoogleBookSchema);

module.exports = GoogleBook;