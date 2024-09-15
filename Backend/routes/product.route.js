import express from 'express';

import mongoose from 'mongoose';
import Product from '../models/product.model.js';

const router = express.Router();


router.post('/createProduct', async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.logo) {
        return res.status(400).json({ success: false, message: 'Please provider all fields of product' });
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, message: 'Product added successfully', data: newProduct });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: 'Something went wrong' });
    }
});

router.get('/getAllProduct', async (req, res) => {
    const allProduct = await Product.find({});
    try {
        res.status(201).json({ success: true, message: 'Product fetched successfully', data: allProduct, count: allProduct?.length });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: 'Something went wrong' });
    }
});

router.delete('/deleteProduct/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Product id is invalid' });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(201).json({ success: true, message: 'Product Deleted successfully' });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: 'Something went wrong' });
    }
});

router.put('/updateProduct/:id', async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Product id is invalid' });
    }

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(201).json({ success: true, message: 'Product Updated successfully', data: updateProduct });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: 'Something went wrong' });
    }
});

export default router;