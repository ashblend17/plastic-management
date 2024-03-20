const express = require('express');
const router = express.Router();
const data=require('../../data/user_details');
let order_details=data.map(u=>({userid:u.userid,order_details:u.order_details}));
router.get('/:id', (req, res,next) => {
    const userId=req.params.id;
    const user=order_details.find(u=>u.userid===userId);
    if(!user){
        res.status(400).json({
            message:'user not found'
        });
        return;
    }
    res.status(200).json({
        message: ' orders listed of specific user',
        userId:user.userid,
        orderDetails:user.order_details
    });
});
router.get('/', (req, res,next) => {
    
    res.status(200).json({
        message: 'All orders listed',
        orderDetails:order_details
    });
});
router.post('/', (req, res,next) => {
    res.status(200).json({
        message: 'ordering food'
    });
});
router.get('/menu', (req, res,next) => {
    res.status(200).json({
        message: 'here is menu'
    });
});
module.exports = router;
