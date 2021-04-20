const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId : { type: String, required: true},
    name: { type: String, required: true},
    manufacturer: { type: String, required: true},
    description: { type: String, required: true},
    mainPepper: { type: String, required: true},
    imageUrl: { type: String, required: true},
    heat : { type: Number, required: true, min:1, max:10},
    likes : { type: Number, required: true},
    dislikes : { type: Number, required: true},
    usersLiked : { type: Array[string], required: true}, // essai 1 array ?
    usersDisliked : [{type: string, required: true}], // essai 2 array ?
});

module.exports = mongoose.model('Sauce', sauceSchema);