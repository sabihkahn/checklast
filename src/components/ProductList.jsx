import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://bracelet-backend.vercel.app/api/v1/Product/get-product")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        } else {
          console.error("Failed to fetch products");
        }
      })
      .catch((err) => console.error("API error:", err));
  }, []);


  
  return (
    <div className="product-list-container">
      <h1 className="product-list-title">Our Products</h1>
      <div className="product-grid">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="product-card"
            onClick={() =>
              navigate("/product-purchase", { state: product }) // Send whole product object
            }
          >
            <div className="product-image-container">
              {product.link ? (
                <img
                  src={product.link}
                  alt={product.name}
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x300?text=Product+Image";
                  }}
                />
              ) : (
                <div className="product-image-placeholder">
                  <span>No Image Available</span>
                </div>
              )}
              {product.persent && (
                <span className="product-discount">🏷️ {product.persent}</span>
              )}
            </div>
            <div className="product-details">
              <h2 className="bl1">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <div className="product-price-container">
                <div>
                  <span className="product-price">Rs. {product.price}</span>
                  {product.cutprice && (
                    <span className="product-original-price">
                      Rs. {product.cutprice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
