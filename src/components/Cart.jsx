import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const price = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    // Delivery charge logic
    let delivery = 0;
    if (totalItems >= 10) delivery = 250;
    else if (totalItems >= 6) delivery = 200;
    else if (totalItems >= 3) delivery = 150;

    setDeliveryCharge(delivery);
    setTotalPrice(price + delivery);
  }, [cartItems]);

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cartItems.map((item, i) => (
            <div className="cart-item" key={i}>
              <img src={item.image} alt={item.name} className="cart-img" />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>Rs. {item.price} x {item.quantity}</p>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
            </div>
          ))}

          <div className="bill-summary">
            <p><strong>Delivery Charges:</strong> Rs. {deliveryCharge}</p>
            <p><strong>Total Bill:</strong> Rs. {totalPrice}</p>
          </div>

          <Link to="/checkout">
            <button className="checkout-btn">🧾 Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
