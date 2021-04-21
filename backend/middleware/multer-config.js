const multer = require('multer');

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
        const name = file.originalname.split(' ').join('_'); // propriété originalname permet de récupérer le nom d'origine
        const extension = MIME_TYPES[files.mimetype];
        callback(null, name + Date.now() + '.' + extension); // null signifie il n'y a pas d'erreur
    }
});


module.exports = multer({ storage }).single('image'); // méthode multer; on lui passe notre objet storage; et méthode single pour indiquer fichier unique et image uniquement