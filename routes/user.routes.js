const express = require('express');
const router = express.Router();
const { body,validationResult } = require('express-validator');
const userModel = require('../models/user.model')


router.get('/register',
    (req,res)=>{
    res.render('register');

});

router.post('/register' , 
    body('email').trim().isEmail().isLength({min:10}),
    body('passwords').trim().isLength({min:6}),
    body('username').trim().isLength({min:3}),
    (req,res)=>{
        const error = validationResult(req)

        if(!error.isEmpty()){
            return res.status(400).json({
                error: error.array(),
                message: 'Invalid data'
            })
        }
     
        res.send(error)
    }
)

module.exports = router;