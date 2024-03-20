const mongoose=require('mongoose');
const express = require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const router = express.Router();
const User=require('../../models/users');

router.post('/', (req, res, next) => {
    const { userId, password } = req.body;
    User.findOne({userId}).exec()
    .then(user=>{
        if(!user){
           return  res.status(400).json({
                message:'Invalid Credentials'
            });
        }
        bcrypt.compare(password,user.password,(err,result)=>{
            if(err){
                console.log(err);
                return  res.status(400).json({
                    message:'Invalid Credentials'
                });
            }
            if(result){
                const token=jwt.sign(
                {
                    userId:user.userId,
                    name:user.name
                },
                'sasya',
                {
                    expiresIn:'1h'
                });
                return res.status(200).json({
                    message:'Logged in Successfully',
                    token:token
                });
            }
                return  res.status(400).json({
                    message:'Invalid Credentials'
                });
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message:'Internal server error.'
        })
    })
});

module.exports = router;
