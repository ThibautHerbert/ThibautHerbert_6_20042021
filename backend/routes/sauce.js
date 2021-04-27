const express = require('express');
const router = express.Router();

//const Sauce = require('../models/stuff');
const sauceCtrl = require('../controllers/stuff'); // chemin local
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, sauceCtrl.createSauce);
//router.post('/:id/like', auth, multer, sauceCtrl.likeSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauce);
// mettre multer après la requête authentification sinon un fichier avec requête non authentifiée serait sauvegardé
module.exports = router;