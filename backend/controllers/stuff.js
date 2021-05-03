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
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // on récupère par l'id de la sauce
        .then(sauce => {
            console.log("combien de j'aime au départ ? " + sauce.like)
            switch(req.body.like) {             // switch évalue l'expression fournie : like 
                case 1: // utilisateur aime la sauce
                    console.log("Le " + sauce.name + " j'aime");
                    // identifiant de l'utilisateur doit être ajouté au tableau approprié  :
                    if (! sauce.usersLiked.includes(req.body.userId)) { //si utilisateur n'a pas déjà aimé la sauce alors 
                        //sauce.like ++;
                        //sauce.usersLiked.push(userId);
                        console.log("combien de j'aime ? " + sauce.likes)
                        console.log(sauce.usersLiked)

                        Sauce.updateOne({ _id: req.params.id}, {$push: {usersLiked: req.body.userId}, $inc: {likes: 1}})
                            .then(() => res.status(201).json({ message: "j'aime : ajouté à la sauce"}))
                            .catch(error => res.status(400).json({ error }));       
                    }
                    // en gardant une trace de ses préférences et en l'empêchant d'aimer la même sauce plusieurs fois
                    // mettre à jour nbr total de j'aime
                    break; 
                    // break permet de s'assurer que seules les instructions associées à ce cas seront exécutées
                    // si break n'est pas utilisée le programme continuera son exécution
                    /// break empêche donc la répétition d'aimer la même sauce plusieurs fois en plus du if ??
                case 0: // utilisateur annule ce qu'il aime ou n'aime pas
                    console.log("Le " + sauce.name + " 0 j'aime, 0 j'aime pas");
                    // identifiant de l'utilisateur doit être supprimé du tableau approprié 
                    // en gardant une trace de ses préférences et en l'empêchant de ne pas aimer ou d'aimer la même sauce plusieurs fois
                    // mettre à jour nbr total de j'aime
                    
                    if (sauce.usersLiked.includes(req.body.userId)) { // doit retirer 1 aux j'aime et enlever l'id du array
                        Sauce.updateOne({ _id: req.params.id}, {$pull: {usersLiked: req.body.userId}, $inc: {likes: -1}})
                            .then(() => res.status(201).json({ message: "j'aime : retiré de la sauce"}))
                            .catch(error => res.status(400).json({ error }));
                    } else if (sauce.usersDisliked.includes(req.body.userId)) { // doit retirer 1 aux je n'aime pas et enlever l'id du array
                        Sauce.updateOne({ _id: req.params.id}, {$pull: {usersDisliked: req.body.userId}, $inc: {dislikes: -1}})
                            .then(() => res.status(201).json({ message: "je n'aime pas : retiré de la sauce"}))
                            .catch(error => res.status(400).json({ error }));
                    }
                    break;
                case -1: // utilisateur n'aime la sauce
                    console.log("Le " + sauce.name + " je n'aime pas");
                    // identifiant de l'utilisateur doit être ajouté du tableau approprié
                    // en gardant une trace de ses préférences et en l'empêchant de ne pas aimer la même sauce plusieurs fois
                    // mettre à jour nbr total de je n'aime pas
                    if (! sauce.usersDisliked.includes(req.body.userId)) { // doit ajouter 1 aux dislikes et ajouter un id à l'array
                        Sauce.updateOne({ _id: req.params.id}, {$push: {usersDisliked: req.body.userId}, $inc: {dislikes: 1}})
                            .then(() => res.status(201).json({ message: "je n'aime pas : ajouté à la sauce"}))
                            .catch(error => res.status(400).json({ error }));
                    }
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