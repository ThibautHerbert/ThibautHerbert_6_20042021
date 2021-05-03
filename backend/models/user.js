
const mongoose =  require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')// npm install --save mongoose-unique-validator
const validator = require('validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, validate: [validator.isEmail, 'Veuillez renseigner un email valide']}, //true, unique: true empêche une création avec la même adresse mail
    password: { type: String, required: true  , /*minlength:8 ,*/ }
    
    
});

userSchema.plugin(uniqueValidator); // permet de mettre en place le uniqueValidator de l'email avant le model schema

module.exports = mongoose.model('User', userSchema); // exporte le schéma sous forme de modèle ; fonction model de mongoose
// peut aussi s'écrire :
/*
const User = mongoose.model('User', userSchema);
module.exports = User;
*/