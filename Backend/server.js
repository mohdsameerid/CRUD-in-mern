// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/connectDatabase.js';
import productRoutes from './routes/product.route.js'

const app = express();
dotenv.config();

app.use(express.json());

app.use('/api/v1/product', productRoutes); // product route

app.listen(process.env.PORT, () => {
    connectDatabase();
    console.log('App is running at http://localhost:' + process.env.PORT);
});
