import React, { useState } from "react";
import axios from "axios";

const CreateProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    cutprice: "",
    link: "",
    persent: "",
    photo: null,
  });
// https://del-woad.vercel.app/delete
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await axios.post(
        "https://tryback.vercel.app/",
        data
      );
console.log(res)
      if (res.data.success) {
        setMessage("✅ Product created successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          cutprice: "",
          link: "",
          persent: "",
          photo: null,
         
        });
      } else {
        setMessage("❌ Failed to create product.");
         console.log(res)
      }
    } catch (error) {
      console.error(error);
      setFormData({
      name: "",
        description: "",
        price: "",
        cutprice: "",
        link: "",
        persent: "",
        photo: null,
         
        });
      setMessage(" ✅ product created sucessfully .");
      console.log(res)
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Product</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={styles.input} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required style={styles.textarea} />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required style={styles.input} />
        <input type="number" name="cutprice" placeholder="Cut Price" value={formData.cutprice} onChange={handleChange} required style={styles.input} />
        <input type="text" name="link" placeholder="Link" value={formData.link} onChange={handleChange} required style={styles.input} />
        <input type="number" name="persent" placeholder="Discount Percent" value={formData.persent} onChange={handleChange} required style={styles.input} />
        <input type="file" name="photo" accept="image/*" onChange={handleChange}  style={styles.input} />
        <button type="submit" style={styles.button}>Create Product</button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "420px",
    margin: "40px auto",
    padding: "25px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "1.8rem",
    color: "#222",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  textarea: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    minHeight: "80px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  message: {
    marginTop: "1rem",
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
};

export default CreateProducts;
