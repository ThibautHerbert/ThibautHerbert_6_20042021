const multer = require('multer');
const crypto = require('crypto');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname + Date.now(); // propriété originalname permet de récupérer le nom d'origine
        const extension = MIME_TYPES[file.mimetype];
        const hash = crypto.createHash('md5').update(name).digest('hex'); //  method to create the hasher and pass the hashing algorithm's name we need to use as the first argument and the secret or salt string as the second argument to the method.
        console.log(hash);
        callback(null, hash + '.' + extension); // null signifie il n'y a pas d'erreur
    }
});


module.exports = multer({ storage }).single('image'); // méthode multer; on lui passe notre objet storage; et méthode single pour indiquer fichier unique et image uniquement