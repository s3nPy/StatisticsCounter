const { Router } = require('express');
const Counter = require('../models/Counter');
const auth = require('../middlewares/auth.middleware');
const { check, validationResult } = require('express-validator');
const router = Router();

router.post('/create', auth, [
    check('name').notEmpty().isLength({max: 32})
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array(), message: 'Name too long'});
        }

        const counter = new Counter({
            name: req.body.name,
            owner: req.user.userId
        });
        await counter.save();
        
        return res.status(201).json({message: 'Counter has been created'});
    } catch (error) {
        res.status(500).json({message: `Error has occurred ${error}`});
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const counters = await Counter.find({owner: req.user.userId});
        res.json(counters);
    } catch (error) {
        res.status(500).json({message: `Error has occurred ${error}`});
    }
});

router.post('/add', [
    check('value').isNumeric(),
    check('id').notEmpty()
], auth, async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty() || req.body.value <= 0){
            return res.status(422).json({errors: errors.array(), message: 'Invalid data'});
        }

        const counter = await Counter.findById(req.body.id);
        if(!counter){
            throw new Error(`No such counter with id '${req.body.id}'`);
        }

        counter.values.push(req.body.value);
        counter.dates.push(Date.now());
        await counter.save();
        
        res.json({message: 'Value added successfully'});
    } catch (error) {
        res.status(500).json({message: `Error has occurred ${error}`});
    }
});

router.post('/delete', [
    check('id').notEmpty()
], auth, async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array(), message: 'Invalid data'});
        }

        const {ok} = await Counter.deleteOne({ _id: req.body.id});
        if(!ok){
            throw new Error(`No such counter with id '${req.body.id}'`);
        }
        
        res.json({message: 'Counter successfully deleted'});
    } catch (error) {
        res.status(500).json({message: `Error has occurred ${error}`});
    }
});


module.exports = router;