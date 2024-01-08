const jwt = require('jsonwebtoken');
const Visiteur = require('../models/visiteur');
const bcrypt = require('bcrypt');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require('express-validator');



require('dotenv').config();

// Signup user
exports.signup = [
    // Validate and sanitize fields.
   //body('email').isEmail().withMessage('Veuillez entrer un email valide.').normalizeEmail(),
    //body('password').isLength({ min: 5 }).withMessage('Le mot de passe doit contenir au moins 5 caractères.').trim(),


    asyncHandler(async (req, res, next) => {
        // Check for errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Send back the first error message
            return res.status(400).json({ error: errors.array()[0].msg });
        }


        const hash = await bcrypt.hash(req.body.password, 10);
        const visiteur = new Visiteur({
            nom : req.body.nom,
            prenom: req.body.prenom,
            tel: req.body.tel,
            date_embauche: req.body.date_embauche,
            email: req.body.email,
            password: hash
            
        });
        await visiteur.save();
        res.status(201).json({ message: 'Utilisateur créé !', 
                                visiteur_id: visiteur._id,
                            visiteur_email: req.body,
                            visiteur_password: req});
    })
];


//Login user


exports.login = asyncHandler(async (req, res, next) => {
    const visiteur = await Visiteur.findOne({ email: req.body.email });
    if (!visiteur) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    const valid = await bcrypt.compare(req.body.password, visiteur.password);
    if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
    }
    res.status(200).json({
        visiteurId: visiteur._id,
        token: jwt.sign(
            { visiteurId: visiteur._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
    });
});
