import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductCreatePage.css'; // We can reuse the same styles

const ProductEditPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setName(data.name);
        setPrice(data.price);
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error('Failed to fetch product details', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = { name, price, imageUrl };
      await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct);
      navigate('/admin'); // Redirect to product list on success
    } catch (error) {
      console.error('Failed to update product', error);
    }
  };

  return (
    <div className="product-create-container">
      <h1>Edit Product</h1>
      <form className="product-form" onSubmit={handleSubmit}>
        {/* The form JSX is identical to ProductCreatePage */}
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <button type="submit" className="btn-submit">Update Product</button>
      </form>
    </div>
  );
};

export default ProductEditPage;