import React, { useState, useEffect } from "react";

import Product from "../../../types/Product";

export default function ProductDetail({ product }: { product: Product }) {
  const [amount, setAmount] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorCode, setSelectedColorCode] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeRemain, setSizeRemain] = useState<string[]>([]);
  const [amountRemain, setAmountRemain] = useState(-1);

  const storage = window.localStorage;

  useEffect(() => {
    if (product.variants) {
      let remain: string[] = [];
      for (let i = 0; i < product.variants.length; i++) {
        if (
          product.variants[i].color_code === selectedColorCode &&
          product.variants[i].stock > 0
        ) {
          remain.push(product.variants[i].size);
        }
      }
      setSelectedSize("");
      setAmountRemain(-1);
      setSizeRemain(remain);

      console.log("remain", remain);
    }
  }, [selectedColorCode]);

  useEffect(() => {
    if (product.variants) {
      for (let i = 0; i < product.variants.length; i++) {
        if (
          product.variants[i].color_code === selectedColorCode &&
          product.variants[i].size === selectedSize
        ) {
          setAmountRemain(product.variants[i].stock);
          break;
        }
      }
      setAmount(0);
    }
  }, [selectedSize]);

  function addToCart() {
    const data = {
      product_id: product.id,
      color_name: selectedColor,
      size: selectedSize,
      main_image: product.main_image,
      title: product.title,
      price: product.price,
      qty: amount,
      stock: amountRemain,
    };
    const cart = storage.getItem("cart");
    if (cart) {
      const cartArray = JSON.parse(cart);
      // find if the product is already in the cart
      let isExist = false;
      for (let i = 0; i < cartArray.length; i++) {
        if (
          cartArray[i].product_id === data.product_id &&
          cartArray[i].color_name === data.color_name &&
          cartArray[i].size === data.size
        ) {
          cartArray[i].qty += data.qty;
          isExist = true;
          break;
        }
      }
      if (!isExist) cartArray.push(data);
      storage.setItem("cart", JSON.stringify(cartArray));
    } else {
      const cartArray = [];
      cartArray.push(data);
      storage.setItem("cart", JSON.stringify(cartArray));
    }

    const event = new Event("customStorageChange");
    window.dispatchEvent(event);
    setAmount(0);
    setSelectedColor("");
    setSelectedSize("");

    alert("已加入購物車");
    // alert(JSON.stringify(JSON.parse(storage.getItem("cart") as string)));
  }

  return (
    <>
      {product.colors ? (
        <>
          <div className="mt-28 flex justify-center">
            <div className="flex w-2/5">
              <div className="w-3/5">
                <img src={product.main_image} className="w-full" alt="" />
              </div>
              <div className="w-2/5 p-5 ">
                <div className="text-xl font-bold mb-2">{product.title}</div>
                <div className="text-sm text-gray-500">{product.id}</div>
                <div className="text-xl font-bold my-3">
                  TWD.{product.price}
                </div>
                <div className="border-t-2 border-gray-400 my-3"></div>
                <div className="flex items-center my-3">
                  <div className="text-sm text-center border-r-2 pr-2 border-gray-400">
                    顏色
                  </div>
                  <div className="flex itmes-center ml-3">
                    {product.colors.length > 0 &&
                      product.colors.map((color) => (
                        <div
                          className="p-1 cursor-pointer flex justify-center items-center mr-2"
                          style={{
                            borderWidth:
                              selectedColor === color.name ? "2px" : "0px",
                            borderColor:
                              selectedColor === color.name
                                ? "gray"
                                : "transparent",
                          }}
                        >
                          <div
                            key={color.code}
                            className="w-6 h-6  border border-black"
                            onClick={() => {
                              setSelectedColor(color.name);
                              setSelectedColorCode(color.code);
                            }}
                            style={{
                              backgroundColor: `#${color.code}`,
                            }}
                          ></div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex items-center my-3">
                  <div className="text-sm text-center border-r-2 pr-2 border-gray-400">
                    尺寸
                  </div>
                  {selectedColor && (
                    <div className="flex itmes-center ml-3">
                      {sizeRemain.length > 0 &&
                        sizeRemain.map((size) => (
                          <div
                            className="p-1 cursor-pointer mr-2 rounded-full flex justify-center items-center mr-2"
                            style={{
                              borderWidth:
                                selectedSize === size ? "2px" : "0px",
                              borderColor:
                                selectedSize === size ? "gray" : "transparent",
                            }}
                          >
                            <div
                              key={size}
                              className="w-6 h-6 border text-xs font-bold justify-center rounded-full flex items-center"
                              onClick={() => {
                                setSelectedSize(size);
                              }}
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
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center my-3">
                  <div className="text-sm text-center border-r-2 pr-2 border-gray-400">
                    數量
                  </div>
                  <div className="flex ml-3 border-2 select-none w-24">
                    <div
                      className="flex-1 text-center cursor-pointer"
                      onClick={() => {
                        if (amount > 0) setAmount(amount - 1);
                      }}
                    >
                      -
                    </div>
                    <div className="flex-1 text-center">{amount}</div>
                    <div
                      className="flex-1 text-center select-none cursor-pointer"
                      onClick={() => {
                        if (amountRemain > amount) {
                          setAmount(amount + 1);
                        }
                      }}
                    >
                      +
                    </div>
                  </div>
                </div>
                剩餘數量 : {amountRemain === -1 ? "未選擇" : amountRemain}
                <div
                  className={
                    "h-10 text-white justify-center flex items-center" +
                    (amount <= 0
                      ? " bg-gray-300 cursor-not-allowed"
                      : " bg-black  cursor-pointer")
                  }
                  onClick={() => {
                    if (amount > 0) addToCart();
                  }}
                >
                  加入購物車
                </div>
                <div className="my-5">{product.note}</div>
                <div className="my-5">{product.texture}</div>
                <div>清洗 : {product.wash}</div>
                <div>產品 : {product.place}</div>
                <div className="my-5">{product.description}</div>
              </div>
            </div>
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
      ) : (
        <div className="flex flex-col w-2/5 my-60 gap-5 p-2 mx-auto bg-white select-none sm:p-4 sm:h-64 rounded-2xl sm:flex-row ">
          <div className="bg-gray-200 h-60 sm:h-full sm:w-72 rounded-xl animate-pulse"></div>
          <div className="flex flex-col flex-1 gap-5 sm:p-2">
            <div className="flex flex-col flex-1 gap-3">
              <div className="w-full bg-gray-200 animate-pulse h-14 rounded-2xl"></div>
              <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
              <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
              <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
              <div className="w-full h-3 bg-gray-200 animate-pulse rounded-2xl"></div>
            </div>
            <div className="flex gap-3 mt-auto">
              <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-20 h-8 ml-auto bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
