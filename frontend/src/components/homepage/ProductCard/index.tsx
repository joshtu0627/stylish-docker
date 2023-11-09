import React from "react";

import Product from "../../../types/Product";

export default function ProductCard({ product }: { product: Product }) {
  console.log(product);

  return (
    <div className="justify-center m-3">
      <img src={product.main_image} className="w-full"></img>
      <div className="flex justify-left mt-2 my-2">
        {product.colors.map((color) => (
          <div
            key={color.code}
            className="w-6 h-6 mr-2"
            style={{ backgroundColor: `#${color.code}` }}
          ></div>
        ))}

        {/* 
        <div className="w-6 h-6 bg-gray-200 mr-2 "></div>
        <div className="w-6 h-6 bg-blue-200 mr-2"></div>
        <div className="w-6 h-6 bg-green-300 "></div> */}
      </div>
      <div className="text-gray-500">{product.title}</div>
      <div className="text-gray-500">TWD:{product.price}</div>
    </div>
  );
}
