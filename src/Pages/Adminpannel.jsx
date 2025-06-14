import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  return (
    <div className="admin-container">
      <header className="admin-header">
        <button 
          className={`hamburger ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1>Admin Dashboard</h1>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav>
          <ul>
          
         <li className='bla'>
             
                <span className="icon">📦</span>
                <span onClick={()=>{navigate("/admin-check-oder")}}>coustom braclet Orders</span>
            
            </li>
         <li className='bla'>
             
                <span className="icon">🌏</span>
                <span onClick={()=>{navigate("/admin-create-product")}}>create products</span>
            
            </li>
         <li className='bla'>
             
                <span className="icon">🚨</span>
                <span onClick={()=>{navigate("/delete-product")}}>delete products</span>
            
            </li>
         <li className='bla'>
             
                <span className="icon">🥡</span>
                <span onClick={()=>{navigate("/newoder")}}>oders from add to cart</span>
            
            </li>
           
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="welcome-section">
          <h2>Welcome to Admin Panel</h2>
          <p className="welcome-text">
            Manage your store, products, and orders from this centralized dashboard.
            You can view analytics, update inventory, and process customer orders.
          </p>
          
          <div className="action-buttons">
            <button className="btn check-orders-btn"onClick={()=>{
              navigate('/admin-check-oder')
            }}>
              Check Recent Orders
            </button>
           
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;