import React, { useState } from "react";

import Product from "../../../types/Product";

export default function ProductDetail({ product }: { product: Product }) {
  const [amount, setAmount] = useState(0);

  return (
    <>
      <div className="mt-28 flex justify-center">
        {product.colors ? (
          <div className="flex w-2/5">
            <div className="w-3/5">
              <img src={product.main_image} className="w-full" alt="" />
            </div>
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

              <div className="flex items-center my-3">
                <div className="text-sm text-center border-r-2 pr-2 border-gray-400">
                  數量
                </div>
                <div className="flex ml-3 border-2 w-24">
                  <div
                    className="flex-1 text-center cursor-pointer"
                    onClick={() => {
                      setAmount(amount - 1);
                    }}
                  >
                    -
                  </div>
                  <div className="flex-1 text-center">{amount}</div>
                  <div
                    className="flex-1 text-center  cursor-pointer"
                    onClick={() => {
                      setAmount(amount + 1);
                    }}
                  >
                    +
                  </div>
                </div>
              </div>

              <div className="bg-black h-10 text-white justify-center flex items-center">
                加入購物車
              </div>

              <div className="my-5">{product.note}</div>
              <div className="my-5">{product.texture}</div>
              <div>清洗 : {product.wash}</div>
              <div>產品 : {product.place}</div>

              <div className="my-5">{product.description}</div>
            </div>
          </div>
        ) : (
          <div>loading</div>
        )}
      </div>
      <div className="flex justify-center">
        <div className="w-2/5">
          <div className="flex items-center justify-between my-5">
            <div className="text-[#8B572A] font-bold">更多產品資訊</div>
            <div className="h-0.5 w-4/5 bg-[#8B572A]"></div>
          </div>
          <div>{product.story}</div>
          <div className="my-5">
            {product.images &&
              product.images.map((image) => (
                <img src={image} className="w-full my-5" alt="" />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
