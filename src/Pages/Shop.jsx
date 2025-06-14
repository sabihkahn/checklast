import React, { useState } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';

const Shop = () => {
  const [form, setForm] = useState({
    name: '',
    braceletColor: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    gender: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://bracletbazar1.vercel.app/api/order',
        form
      );
      if (res.data.success) {
       toast.success("oder placed sucessfully")
        setForm({
          name: '',
          braceletColor: '',
          age: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          province: '',
          gender: '',
        });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="bracelet-order-container">
      <form className="bracelet-form" onSubmit={handleSubmit}>
        <h2 className="bracelet-title">🎨 Custom Bracelet Order</h2>

        <input type="text" name="name" placeholder="Name on braclet" value={form.name} onChange={handleChange} required />
        <input type="text" name="braceletColor" placeholder="Bracelet Color" value={form.braceletColor} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Enter Bracelet owner age" value={form.age} onChange={handleChange} required />
        <input type="number" name="email" placeholder="enter quantity" value={form.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
        <input type="text" name="province" placeholder="name of coustomer" value={form.province} onChange={handleChange} required />
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default Shop;
