import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // We can reuse this!
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        // Fetch main product details
        const productRes = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(productRes.data);

        // Fetch recommendations
        const recRes = await axios.get(`http://localhost:5000/api/products/${id}/recommendations`);
        setRecommendations(recRes.data);
      } catch (error) {
        console.error('Failed to fetch product data', error);
      }
      setLoading(false);
    };

    fetchProductData();
  }, [id]); // Re-fetch if the ID in the URL changes

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-details-container">
      <div className="main-product">
        <img src={product.imageUrl} alt={product.name} />
        <div className="main-product-info">
          <h1>{product.name}</h1>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="description">
            This is a placeholder description for the amazing {product.name}. 
            Experience unparalleled quality and cutting-edge technology.
          </p>
          <button className="add-to-cart-btn-large">Add to Cart</button>
        </div>
      </div>

      <div className="recommendations">
        <h2>You Might Also Like</h2>
        <div className="product-grid">
          {recommendations.map((recProduct) => (
             <Link to={`/products/${recProduct._id}`} key={recProduct._id}>
                <ProductCard product={recProduct} />
             </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;