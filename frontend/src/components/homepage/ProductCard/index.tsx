import React from "react";
import { Link } from "react-router-dom";

import Product from "../../../types/Product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="justify-center m-3">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.main_image}
          className="cursor-pointer"
          style={{ width: "50vw", height: "auto" }}
        ></img>
      </Link>
      <div className="flex justify-left mt-2 my-2 br ">
        {product.colors.length > 0 &&
          product.colors.map((color) => (
            <div
              key={color.code}
              className="w-6 h-6 mr-2 border border-black"
              style={{ backgroundColor: `#${color.code}` }}
            ></div>
          ))}
      </div>
      <div className="text-gray-500">{product.title}</div>
      <div className="text-gray-500">TWD:{product.price}</div>
    </div>
  );
}
