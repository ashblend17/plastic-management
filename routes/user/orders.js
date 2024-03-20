const express = require('express');
const router = express.Router();
const max=100;
const User=require('../../models/users');
const products=require('../../models/products');
//getting menu for user
router.get('/menu', (req, res,next) => {
    products.find().exec()
    .then(users=>{
        const productsInfo=users.map(product=>{
            return {
                itemName:user.itemName,
                price:user.cost
            }
        });
        res.status(200).json({
            message:'here is the menu',
            menu:productsInfo
           });
       }
    )
    .catch(err=>
    {
        return res.status(500).json({
            message:'Internal server error'
        });
    });
});
//getting order details of user
router.get('/:id', (req, res,next) => {
    const userId=req.params.id;
    User.findOne({userId}).exec()
    .then(user=>{
        if(!user){
            return res.status(400).json({
                message:'user not found'
            })
        }
        else{
            res.status(400).json({
                message:'listed order details of user',
                userId:userId,
                orderDetails:user.orderDetails
            })
        }
    })
    .catch(err=>{
        return res.status(400).json({
            message:'Internal server error'
        })
    });
});
//ordering food
router.post('/:id', async (req, res, next) => {
    const userId = req.params.id;
    const { date, items } = req.body;

    try {
        const user = await User.findOne({ userId }).exec();
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }
        let totalAmount=0;
        const ItemsWithTokenPromises=items.map(async item=>{
            try{
                const product=await products.findOne({itemName:item.itemName}).exec();
                if(!product){
                    return res.status(400).json({
                        message:'product is not available'
                    });
                }
                totalAmount+=(product.cost)*(item.quantity);
                return {
                    itemName:item.itemName,
                    quantity:item.quantity,
                    token:Math.floor(Math.random()*max)
                };
            }
            catch (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Internal server error'
                });
            };
            
        });
        const orderItems = await Promise.all(ItemsWithTokenPromises);
        const status='pending';
        user.orderDetails.push({date,orderItems,totalAmount,status});
        user.save()
        .then(result=>{
            return res.status(200).json({
                message:'ordering food and added to db',
                totalAmount:totalAmount
            });
        })
        .catch(err=>{
            console.error(err);
        res.status(500).json({
            message: 'Internal server error'
        });
        });
        
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    };
}); 

module.exports = router;
