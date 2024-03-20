const express = require('express');
const router = express.Router();
router.get('/:id', (req, res,next) => {
    const userId=req.params.id;
    res.status(200).json({
        message: ' orders listed of specific user',
        userId:user.userid,
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
