import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Productpurchase = () => {
  const { state: product } = useLocation();
  const [quantity, setQuantity] = useState(1);
const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [message, setMessage] = useState("");
  const [codLoading, setCodLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const [popupData, setPopupData] = useState({
    nameOnBracelet: "",
    color: "",
    address: "",
    age: "",
  });

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCashOnDelivery = async () => {
    if (!form.name || !form.phone || !form.address || !form.city) {
      setMessage("❌ Please fill all fields.");
      return;
    }

    setCodLoading(true);

    const orderData = {
      ...form,
      products: [
        {
          name: product.name,
          price: product.price,
          quantity,
          image: product.link,
          // Optional: Add bracelet data here too if needed
        },
      ],
    };

    try {
      await axios.post("https://easycart-two.vercel.app/", orderData);
      setMessage("✅ Order placed successfully with Cash on Delivery!");
    } catch (error) {
      setMessage("❌ Failed to place order.");
    } finally {
      setCodLoading(false);
    }
  };

  const saveToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    existingCart.push({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.link,
      quantity,
      braceletText: popupData.nameOnBracelet,   // ✅ correct key
      braceletColor: popupData.color,           // ✅ correct key
      userAddress: popupData.address,           // ✅ correct key
      age: popupData.age,
    });

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setPopupOpen(false);
    alert("✅ Product added to cart!");
  };

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-container" style={{ padding: 20 }}>
      <div className="badge">HOT PRODUCT | LOW STOCK</div>

      {product.link ? (
        <img
          src={product.link}
          alt={product.name}
          className="product-image12"
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "10px",
            margin: "10px auto",
            display: "block",
          }}
        />
      ) : (
        <div style={{ textAlign: "center", margin: "10px 0" }}>No Image Available</div>
      )}

      <h1>{product.name}</h1>

      <div className="price-box" style={{ fontSize: "18px", marginBottom: "10px" }}>
        <span style={{ fontWeight: "bold" }}>Rs. {product.price}</span>
        {product.cutprice && (
          <>
            {" "}
            <span style={{ textDecoration: "line-through", marginLeft: "10px" }}>
              Rs. {product.cutprice}
            </span>
          </>
        )}
      </div>

      <div className="quantity-section" style={{ marginBottom: "20px" }}>
        <label>Quantity</label>
        <div className="quantity-control" style={{ display: "flex", gap: 10 }}>
          <button onClick={decrease}>−</button>
          <span>{quantity}</span>
          <button onClick={increase}>+</button>
        </div>
      </div>
{/* 
      <div className="form-section" style={{ marginBottom: "20px" }}>
        <input
          name="name"
          onChange={handleChange}
          placeholder="Your Name"
          style={{ display: "block", marginBottom: 10, padding: 8, width: "100%" }}
        />
        <input
          name="phone"
          onChange={handleChange}
          placeholder="Phone Number"
          style={{ display: "block", marginBottom: 10, padding: 8, width: "100%" }}
        />
        <input
          name="address"
          onChange={handleChange}
          placeholder="Address"
          style={{ display: "block", marginBottom: 10, padding: 8, width: "100%" }}
        />
        <input
          name="city"
          onChange={handleChange}
          placeholder="City"
          style={{ display: "block", marginBottom: 10, padding: 8, width: "100%" }}
        />
      </div> */}

      <button
        className="cod-button"
        onClick={()=>{
navigate('/shop')
        }}
        style={{
          background: "#000",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          marginBottom: 10,
        }}
        disabled={codLoading}
      >
        {codLoading ? "Placing Order..." : "🛒 Buy with Cash on Delivery"}
      </button>

      <div style={{ color: "green", marginBottom: 20 }}>{message}</div>

      <button
        className="add-cart"
        onClick={() => setPopupOpen(true)}
        style={{
          background: "#555",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Add to Cart Instead
      </button>

      {popupOpen && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h3>Bracelet Customization</h3>
            <input
              type="text"
              placeholder="Name on bracelet"
              value={popupData.nameOnBracelet}
              onChange={(e) =>
                setPopupData({ ...popupData, nameOnBracelet: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Bracelet Color"
              className="test"
              value={popupData.color}
              onChange={(e) =>
                setPopupData({ ...popupData, color: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Your Address"
              value={popupData.address}
              onChange={(e) =>
                setPopupData({ ...popupData, address: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Your Age"
              value={popupData.age}
              onChange={(e) =>
                setPopupData({ ...popupData, age: e.target.value })
              }
              style={styles.input}
            />
            <button onClick={saveToCart} style={styles.confirm}>✅ Confirm</button>
            <button onClick={() => setPopupOpen(false)} style={styles.cancel}>❌ Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 999
  },
  popup: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  confirm: {
    backgroundColor: "#28a745", color: "#fff",
    padding: "10px", borderRadius: "5px", border: "none"
  },
  cancel: {
    backgroundColor: "#dc3545", color: "#fff",
    padding: "10px", borderRadius: "5px", border: "none"
  }
};

export default Productpurchase;
