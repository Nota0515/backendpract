const express = require('express');
const router = express.Router();
const { body,validationResult } = require('express-validator');
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.get('/register',
    (req,res)=>{
    res.render('register');

});

router.post('/register' , 
    body('email').trim().isEmail().isLength({min:10}),
    body('password').trim().isLength({min:3}),
    body('username').trim().isLength({min:3}),
   async (req,res)=>{
        const error = validationResult(req)

        if(!error.isEmpty()){
            return res.status(400).json({
                error: error.array(),
                message: 'Invalid data'
            })
        }

        const {username , email , password} = req.body;
        const haspassword = await bcrypt.hash(password , 10)
        const newUser = await userModel.create({
            username,
            email,
            password: haspassword
        })

        res.json(newUser)
    }
)

router.get('/login' , (req,res)=>{
    res.render('login')
})

router.post('/login', 
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:3}),
    async (req , res)=>{
        const error = validationResult(req.body)

        if(!error.isEmpty()){
            return res.status(400).json({
                error: error.array(),
                message: 'Invalid Data'
            })
        }

        const {username , password} = req.body;
        const user = await userModel.findOne({
            username: username
        })

        if(!user){
            return res.status(400).json({
                message:'Username or password incorrect'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            res.status(400).json({
                message: "invalid username or password"
            })
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        },
        process.env.JWT_SECRET,
    )

    res.cookie('token' , token)
    res.send('logedIn')


    }
)



module.exports = router;