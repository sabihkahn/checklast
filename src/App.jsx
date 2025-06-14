import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from "react-router-dom";
import Shop from './Pages/Shop'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Home from './Pages/Home'
import Login from './Pages/Login';
import Admin from './Pages/Adminpannel';
import Oders from './Pages/Oders';
import CreateProducts from './Pages/CreateProducts';
import DeleteProduct from './Pages/DeleteProduct';
import Productpurchase from './Pages/Productpurchase';
import Cart from './components/Cart';
import CheckOut from './Pages/CheckOut';
import Newoder from './Pages/Newoder';


const App = () => {
  return (
  <div>


      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
     
        <Route path="/admin-check-oder" element={<Oders/>} />
        <Route path="/checkout" element={<CheckOut/>} />
        <Route path="/newoder" element={<Newoder/>} />
        <Route path="/admin-panel" element={<Admin/>} />
        <Route path="/delete-product" element={<DeleteProduct/>} />
        <Route path="/product-purchase" element={<Productpurchase/>} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/admin" element={<Login/>} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/admin-create-product' element={<CreateProducts/>} />
      </Routes>
      <Footer />



    </div>
  )
}

export default App
