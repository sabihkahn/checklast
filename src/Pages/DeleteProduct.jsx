// src/components/DeleteProduct.jsx
import React, { useState, useEffect } from 'react';

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          'https://bracelet-backend.vercel.app/api/v1/Product/get-product'
        );
        const json = await res.json();
        if (json.success) {
          setProducts(json.data);
        } else {
          console.error('Fetch failed:', json.message);
        }
      } catch (err) {
        console.error('API error:', err);
      }
    };
    fetchProducts();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`https://del-woad.vercel.app/delete/${id}`, {
        method: 'POST',
      });
      const json = await res.json();
      if (json.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert('Delete failed: ' + (json.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('DELETED 🥗');
      window.location.reload();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={{ 
      maxWidth: 800, 
      margin: '2rem auto', 
      fontFamily: 'sans-serif',
      backgroundColor: 'white',
      color: 'black',
      padding: '1rem',
      borderRadius: '8px',
      border: '2px solid black'
    }}>
      <h1 style={{ textAlign: 'center' }}>Products</h1>
      {products.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No products found or loading .........</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid black',
              borderRadius: 6,
              padding: 12,
              marginBottom: 12,
              backgroundColor: 'white',
              color: 'black',
            }}
          >
            <img
              src={product.link || 'https://via.placeholder.com/80'}
              alt={product.name}
              width={80}
              height={80}
              style={{ objectFit: 'cover', borderRadius: 4, marginRight: 16 }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/80';
              }}
            />
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: '0 0 4px' }}>{product.name}</h2>
              <p style={{ margin: '0 0 6px' }}>{product.description}</p>
              <strong>Rs. {product.price}</strong>
            </div>
            <button
              onClick={() => handleDelete(product._id)}
              disabled={deletingId === product._id}
              style={{
                background: deletingId === product._id ? '#aaa' : 'black',
                color: 'white',
                border: '2px solid black',
                padding: '8px 12px',
                borderRadius: 4,
                cursor: deletingId === product._id ? 'not-allowed' : 'pointer',
              }}
            >
              {deletingId === product._id ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default DeleteProduct;
