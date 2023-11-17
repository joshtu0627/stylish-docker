import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import ProductDetail from "../components/productpage/ProductDetail";
import Product from "../types/Product";

export default function ProductPage() {
  const { productId } = useParams();

  const [product, setProduct] = useState<Product>({} as Product);

  useEffect(() => {
    fetch(`https://13.236.23.10:8000/api/1.0/products/details?id=${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
        console.log("data", data.data);
      })
      .then(() => {
        console.log("product", product);
      });
  }, []);

  return (
    <div>
      <Header />
      {product.id}
      <ProductDetail product={product} />
      <Footer />
    </div>
  );
}
