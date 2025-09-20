const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/productModel');
const axios = require('axios')

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// --- REFACTORED CRUD ROUTES ---

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET a single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST (create) a new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, imageUrl } = req.body;
    const product = new Product({
      name,
      price,
      imageUrl,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT (update) a product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { name, price, imageUrl } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.price = price;
      product.imageUrl = imageUrl;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne(); 
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET recommendations for a product
app.get('/api/products/:id/recommendations', async (req, res) => {
  try {
    const urlToCall = `http://127.0.0.1:5001/api/recommendations/${req.params.id}`;
    
    // ADD THIS LINE FOR DEBUGGING
    console.log('Attempting to call Python service at:', urlToCall);

    // Call the Python recommendation service
    const { data } = await axios.get(urlToCall);
    
    res.json(data);
  } catch (error) {
    // We will check the Node.js terminal for errors, not just the browser
    console.error("Error fetching recommendations:", error.message);
    res.status(500).json({ message: 'Could not fetch recommendations' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));