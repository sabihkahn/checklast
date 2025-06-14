import React, { useEffect, useState } from "react";
import axios from "axios";

const NewOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://easycart-two.vercel.app/orders")
      .then((res) => {
        setOrders(res.data.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
      });
  }, []);

  const getDeliveryCharges = (qty) => {
    if (qty >= 10) return 250;
    if (qty >= 6) return 200;
    if (qty >= 3) return 150;
    return 100;
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>All Orders</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders yet.</p>
      ) : (
        orders.map((order, index) => {
          const products = Array.isArray(order.products) ? order.products : [];
          const totalQty = products.reduce((sum, p) => sum + p.quantity, 0);
          const totalPrice = products.reduce((sum, p) => sum + p.quantity * p.price, 0);
          const deliveryCharges = getDeliveryCharges(totalQty);
          const grandTotal = totalPrice + deliveryCharges;

          return (
            <div key={index} style={styles.orderCard}>
              <div style={styles.userInfo}>
                <h3>{order.name}</h3>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address || "N/A"}</p>
                <p><strong>City:</strong> {order.city || "N/A"}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <div style={styles.productsWrapper}>
                {products.map((product, i) => (
                  <div key={i} style={styles.productCard}>
                    <img src={product.image} alt={product.name} style={styles.image} />
                    <div>
                      <p><strong>{product.name}</strong></p>
                      <p>Qty: {product.quantity}</p>
                      <p>Price: Rs. {product.price}</p>
                      <p>Total: Rs. {product.price * product.quantity}</p>
                      <p><strong>Age:</strong> {product.age || "N/A"}</p>
                      <p><strong>Name on Bracelet:</strong> {product.braceletText || "N/A"}</p>
                      <p><strong>Bracelet Color:</strong> {product.braceletColor || "N/A"}</p>
                      <p><strong>Custom Address:</strong> {product.userAddress || "N/A"}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.summary}>
                <p><strong>Total Items:</strong> {totalQty}</p>
                <p><strong>Total Price:</strong> Rs. {totalPrice}</p>
                <p><strong>Delivery Charges:</strong> Rs. {deliveryCharges}</p>
                <p><strong>Grand Total:</strong> Rs. {grandTotal}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

const styles = {
  page: {
    padding: "20px",
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "#fff",
    color: "#111",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "30px",
  },
  orderCard: {
    backgroundColor: "#f7f7f7",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    color: "#000",
  },
  userInfo: {
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  productsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "20px",
  },
  productCard: {
    display: "flex",
    gap: "10px",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "8px",
    width: "250px",
    flexDirection: "column",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  summary: {
    borderTop: "1px solid #ccc",
    paddingTop: "10px",
    fontSize: "16px",
    lineHeight: "1.6",
  },
};

export default NewOrder;
