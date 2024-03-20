const morgan = require('morgan');
const express=require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const app=express();
app.use(express.json());
const User_plasticsRoutes=require('./routes/user/plastics');
const User_ordersRoutes=require('./routes/user/orders');
const loginRoutes=require('./routes/user/login');
const registrationRoutes=require('./routes/user/registration');
const Manager_plasticsRoutes=require('./routes/manager/plastics');
const Manager_ordersRoutes=require('./routes/manager/orders');
const Manager_productRoutes=require('./routes/manager/products');
mongoose.connect("mongodb+srv://sasyaparimi88:953N200P@cafeflow.xuayxlv.mongodb.net/?retryWrites=true&w=majority&appName=CafeFlow")
.then(()=>console.log('Connected to MongoDB Atlas'))
.catch(err=>console.log('Error connecting to MongoDB Atlas'));


app.use('/user/plastics',User_plasticsRoutes);
app.use('/user/orders',User_ordersRoutes);
app.use('/user/login',loginRoutes);
app.use('/user/registration',registrationRoutes);
app.use('/manager/plastics',Manager_plasticsRoutes);
app.use('/manager/orders',Manager_ordersRoutes);
app.use('/manager/products',Manager_productRoutes);
module.exports=app;


