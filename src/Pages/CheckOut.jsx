import React, { useState, useEffect } from "react";
import axios from "axios";
 

const CheckOut = () => {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address || !form.city) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      const res = await axios.post("https://easycart-two.vercel.app/", {
        ...form,
        products: cart,
      });
      setMessage(res.data.message || "Order placed!");
      localStorage.removeItem("cart");
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>🛒 Checkout</h2>

      <input name="name" onChange={handleChange} placeholder="Your Name" />
      <input name="phone" onChange={handleChange} placeholder="Phone Number" />
      <input name="address" onChange={handleChange} placeholder="Address" />
      <input name="city" onChange={handleChange} placeholder="City" />

      <button onClick={handleSubmit}>Submit Order</button>

      <p className="message">{message}</p>
    </div>
  );
};

export default CheckOut;
