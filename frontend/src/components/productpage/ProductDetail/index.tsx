import React from "react";

import Product from "../../../types/Product";

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <div className="mt-28 flex justify-center">
      {product.colors ? (
        <div className="flex w-2/5">
          <img src={product.main_image} className="w-3/5" alt="" />
          <div className="w-2/5 p-5 ">
            <div className="text-xl font-bold mb-2">{product.title}</div>
            <div className="text-sm text-gray-500">{product.id}</div>
            <div className="text-xl font-bold my-3">TWD.{product.price}</div>
            <div className="border-t-2 border-gray-400 my-3"></div>
            <div className="flex items-center my-3">
              <div className="text-sm text-center border-r-2 pr-2 border-gray-400">
                顏色
              </div>
              <div className="flex itmes-center ml-3">
                {product.colors.length > 0 &&
                  product.colors.map((color) => (
                    <div
                      key={color.code}
                      className="w-6 h-6 mr-2 border border-black"
                      style={{ backgroundColor: `#${color.code}` }}
                    ></div>
                  ))}
              </div>
            </div>
            <div className="flex items-center my-3">
              <div className="text-sm text-center border-r-2 pr-2 border-gray-400">
                尺寸
              </div>
              <div className="flex itmes-center ml-3">
                {product.sizes.length > 0 &&
                  product.sizes.map((size) => (
                    <div
                      key={size}
                      className="w-6 h-6 mr-2 border text-xs font-bold justify-center rounded-full flex items-center"
                      style={{
                        color:
                          size === "S"
                            ? `#FFFFFF`
                            : size === "M"
                            ? `#000000`
                            : `#D0D0D0`,
                        backgroundColor:
                          size === "S"
                            ? `#000000`
                            : size === "M"
                            ? `#ECECEC`
                            : `#F0F0F0`,
                      }}
                    >
                      {size}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
