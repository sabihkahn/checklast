import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        'https://bracletbazar1.vercel.app/api/order'
      );
      if (data.success) {
        setOrders(data.orders);
        toast.success('📦 Orders fetched successfully!');
      } else {
        toast.error('⚠️ Could not fetch orders.');
      }
    } catch (error) {
      toast.error('❌ Failed to fetch orders.');
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1 className="orders-title">📋 Your Orders</h1>
        <div className="stats-badge">{orders.length} orders</div>
      </div>

      <div className="orders-grid">
        {orders.map((order, index) => (
          <div key={index} className="order-card">
            <div className="card-header">
              <h2 className="order-name">{order.name}</h2>
              <div className="order-meta">
                <span className="order-gender">{order.gender}</span>
                <span className="order-age">{order.age} years</span>
              </div>
            </div>
            
            <div className="card-body">
              <div className="detail-row">
                <span className="detail-label">Color:</span>
                <span className="detail-value">
                  <span 
                    className="color-indicator" 
                    style={{ backgroundColor: order.braceletColor.toLowerCase() }}
                  ></span>
                  {order.braceletColor}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{order.city}, {order.province}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Contact:</span>
                <span className="detail-value">{order.phone}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Quantity:</span>
                <span className="detail-value">{order.email}</span>
              </div>
              
              <div className="detail-row full-width">
                <span className="detail-label">Address:</span>
                <span className="detail-value">{order.address}</span>
              </div>
            </div>
            
            <div className="card-footer">
              <a
                href={`https://wa.me/${order.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-button"
              >
                <i className="whatsapp-icon">💬</i> Message on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Orders;