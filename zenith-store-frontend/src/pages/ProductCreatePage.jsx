import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductCreatePage.css';

const ProductCreatePage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = { name, price, imageUrl };
      await axios.post('http://localhost:5000/api/products', newProduct);
      navigate('/admin'); // Redirect to the product list on success
    } catch (error) {
      console.error('Failed to create product:', error);
      // Here you could add logic to show an error message to the user
    }
  };

  return (
    <div className="product-create-container">
      <h1>Create New Product</h1>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">Create Product</button>
      </form>
    </div>
  );
};

export default ProductCreatePage;