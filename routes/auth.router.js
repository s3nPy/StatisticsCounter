const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const router = Router();

router.post('/register', [
    check('email').isEmail(),
    check('password').isLength({min: 6})
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array(), message: 'Invalid auth data'});
        }

        const {email, password} = req.body;

        const condidate = await User.findOne({email});
        if(condidate){
            return res.status(400).json({message: 'User is already existing'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({email, password: hashedPassword});
        await user.save();

        res.status(201).json({message: 'User has been created'});
    } catch (error) {
        res.status(500).json({message: `Error has occurred ${error}`});
    }
});


router.post('/login', [
    check('email').isEmail(),
    check('password').notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array(), message: 'Invalid auth data'});
        }

        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: 'User aren\'t existing'});
        }

        const valid = await bcrypt.compare(password, user.password);
        if(!valid){
            return res.status(400).json({message: 'Wrong username or password'});
        }

        const token = jwt.sign(
            {userId: user._id},
            config.get('secretJwt'),
            {expiresIn: '30d'}
        );

        res.json({token});
    } catch (error) {
        res.status(500).json({message: `Error has occurred ${error}`});
    }
});


module.exports = router;