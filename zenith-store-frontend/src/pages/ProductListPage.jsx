import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductListPage.css';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  // 1. Define fetchProducts in the component's main scope
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  // 2. useEffect now simply calls the function on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        
        // 3. This call now works correctly
        fetchProducts(); 

      } catch (error) {
        console.error('Failed to delete product', error);
      }
    }
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1>Products</h1>
        <Link to="/admin/products/new" className="btn-create">Create New</Link>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <Link to={`/admin/products/${product._id}/edit`} className="btn-edit">
                  Edit
                </Link>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListPage;