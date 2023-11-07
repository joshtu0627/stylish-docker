import React from "react";

import Product from "../../../types/Product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <img src={product.main_image}></img>
      <div className="flex justify-left mt-2 my-2">
        <div className="w-6 h-6 bg-gray-200 mr-2 "></div>
        <div className="w-6 h-6 bg-blue-200 mr-2"></div>
        <div className="w-6 h-6 bg-green-300 "></div>
      </div>
      <div className="text-gray-500">{product.title}</div>
      <div className="text-gray-500">TWD:{product.price}</div>
    </div>
  );
}
