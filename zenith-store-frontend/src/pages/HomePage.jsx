import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  // Set up state to hold our products
  const [products, setProducts] = useState([]);

  // useEffect will run once when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch data from our backend API
      const { data } = await axios.get('http://localhost:5000/api/products');
      // Set the data into our state
      setProducts(data);
    };

    fetchProducts();
  }, []); // The empty array [] means this effect runs only once

  return (
    <div className="homepage">
      <h1 className="page-title">Featured Products</h1>
     <div className="product-grid">
  {products.map(product => (
    <Link to={`/products/${product._id}`} key={product._id} style={{textDecoration: 'none', color: 'inherit'}}>
      <ProductCard product={product} />
    </Link>
  ))}
</div>
    </div>
  );
};

export default HomePage;