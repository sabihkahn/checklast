import React from 'react';
import { motion } from 'framer-motion';
import qualityImg from '../assets/brace1.png';
import brandImg from '../assets/brace2.png';
import ProductList from './ProductList';




const fadeInVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 }
  }
};

const ProductInfo = () => {
  return (
   <>
   <ProductList />
   </>
  );
};

export default ProductInfo;
