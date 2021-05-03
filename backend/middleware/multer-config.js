const multer = require('multer');
const crypto = require('crypto');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname + Date.now(); // propriété originalname permet de récupérer le nom d'origine
        const extension = MIME_TYPES[file.mimetype];
        const hash = crypto.createHash('md5').update(name).digest('hex'); //  méthode pour créer le hachage et passer le nom de l'algorithme de hachage comme 1er argument; 2ème argument le sel en string
        callback(null, hash + '.' + extension); // null signifie il n'y a pas d'erreur
    }
});


module.exports = multer({ storage }).single('image'); // méthode multer; on lui passe un objet storage; et méthode single pour indiquer fichier unique et image uniquement