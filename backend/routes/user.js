
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user'); // configure le routeur du user


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login); // route post car le frontend envoie aussi des informations (mail et mdp)

module.exports = router; // exporte ce router
