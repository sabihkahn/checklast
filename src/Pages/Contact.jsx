import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
 const whatsappUrl = `https://wa.me/923354093009`;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="contact-section" id="contact">
      {/* Add this to your HTML head */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      <motion.div
        className="contact-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Contact Us
        </motion.h2>
        
        <motion.div className="contact-info" variants={itemVariants}>
          <div className="contact-item">
            <i className="fas fa-envelope contact-icon"></i>
            <div>
              <h3>Email</h3>
              <a href="mailto:braceletbazar918@gmail.com">braceletbazar918@gmail.com</a>
            </div>
          </div>
          
          <div className="contact-item">
            <i className="fas fa-phone contact-icon"></i>
            <div>
              <h3>Phone</h3>
              <a href="tel:03354093009">0335 4093009</a>
            </div>
          </div>
          
          <div className="contact-item">
            <i className="fab fa-tiktok contact-icon"></i>
            <div>
              <h3>TikTok</h3>
              <a href="https://www.tiktok.com/@braceletbazar1?_t=ZS-8x0dhnvHpKr&_r=1" target="_blank" rel="noopener noreferrer">
                @braceletbazar1
              </a>
            </div>
          </div>
        </motion.div>
        
        <motion.a
          href={whatsappUrl}
          className="whatsapp-button"
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fab fa-whatsapp"></i> Chat on WhatsApp
        </motion.a>
      </motion.div>
    </section>
  );
}

export default Contact
