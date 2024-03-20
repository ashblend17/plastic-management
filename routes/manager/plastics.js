const express=require('express');
const router=express.Router();
const User=require('../../models/users');
const { randomInt } = require('crypto');
const max=100;

router.get("/",(req,res,next)=>{
    User.find()
    .exec()
    .then(users=>{
        const plasticDetails=users.map(user=>{
            return {
                userId:user.userId,
                plasticDetails:user.plasticDetails
            }
        });
         res.status(200).json({
            plasticDetails:plasticDetails
        });
    })
    .catch(err=>{
        
        return res.status(500).json({
            message:'Internal server error.'
        });
    });
})
router.get('/:id',(req,res,next)=>{
    const userId=req.params.id;
    User.findOne({userId})
    .exec()
    .then(user=>{
        if(!user){
            return res.status(400).json({
                message:'user not found'
            });
        }
        res.status(200).json({
            userId:user.userId,
            plasticDetails:user.plasticDetails
        });
    })
    .catch(err=>{
        return res.status(500).json({
            message:'Internal server error.'
        });
    });

});
router.post('/add/:id',(req,res,next)=>{
    const userId=req.params.id;
    const {date,item}=req.body;
    User.findOne({userId}).exec()
    .then(user=>{
        if(!user){
            return res.status(400).json(({
                message:'user not found'
            }));
        }
        const token=Math.floor(Math.random()*max);
        user.plasticDetails.push({date,item,token});
        user.save()
        .then(result=>{
            return res.status(200).json({
                message:'added plastic item succefully',
                userId:user.userId,
                plasticDetails:user.plasticDetails
            })
        })
        .catch(err=>{
            return res.status(500).json({
                message:'Internal server error.'
            });
        });
    })
    .catch(err=>{
        return res.status(500).json({
            message:'Internal server error.'
        });
    });
});
module.exports=router;