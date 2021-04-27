const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    console.log(sauceObject);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject, //copie les champs du corps de la requête
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message : 'Sauce enregistrée'}))
        .catch(error => res.status(400).json({ error }));
};
/*
 //test 1 
exports.likeSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce.like);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject, //copie les champs du corps de la requête
        
    });
    sauce.save()
        .then(() => res.status(201).json({ message : "J'aime enregistré"}))
        .catch(error => res.status(400).json({ error }));
 //test 2       
exports.like = (req, res, next) => {
    const sauceObject = req.file ?
    { 
        ...JSON.parse(req.body.sauce.like),
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "J'aime supprimée"}))
        .catch(error => res.status(400).json({ error }));
};
//test 3  
exports.like = (req, res, next) => {
    Sauce.likes
    Sauce.dislikes.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce modifiée"}))
        .catch(error => res.status(400).json({ error }));
};
*/
// test 4
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            switch(req.body.like) {             // switch évalue l'expression fournie : like 
                case 1: // utilisateur aime la sauce
                    console.log("Le " + sauce.name + " j'aime");
                    // identifiant de l'utilisateur doit être ajouté du tableau approprié 
                    // en gardant une trace de ses préférences et en l'empêchant d'aimer la même sauce plusieurs fois
                    // mettre à jour nbr total de j'aime
                    break; 
                    // break permet de s'assurer que seules les instructions associées à ce cas seront exécutées
                    // si break n'est pas utilisée le programme continuera son exécution
                    /// break empêche donc la répétition d'aimer la même sauce plusieurs fois ??
                case 0: // utilisateur annule ce qu'il aime ou n'aime pas
                    console.log("Le " + sauce.name + " 0 j'aime, 0 j'aime pas");
                    // identifiant de l'utilisateur doit être supprimé du tableau approprié 
                    // en gardant une trace de ses préférences et en l'empêchant de ne pas aimer ou d'aimer la même sauce plusieurs fois
                    // mettre à jour nbr total de j'aime
                    break;
                case -1: // utilisateur n'aime la sauce
                    console.log("Le " + sauce.name + " je n'aime pas");
                    // identifiant de l'utilisateur doit être ajouté du tableau approprié
                    // en gardant une trace de ses préférences et en l'empêchant de ne pas aimer la même sauce plusieurs fois
                    // mettre à jour nbr total de je n'aime pas
                    break;
                default:
                    console.log('Désolé, un problème a été détecté'); //Une clause exécutée si aucune correspondance n'est trouvée avec les clause case (et/ou s'il n'y a pas de break pour les clauses case précédentes)
            }
        })
        .catch(error => res.status(400).json({ error }));
};
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    { 
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce modifiée"}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};