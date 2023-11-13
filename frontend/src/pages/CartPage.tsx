import React, { useState, useEffect } from "react";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import CartProduct from "../../../types/CartProduct";

export default function CartPage() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    send_time: "",
  });

  const storage = window.localStorage;

  useEffect(() => {
    setCartProducts(JSON.parse(storage.getItem("cart") || "[]"));
  });

  return (
    <>
      <Header />
      <div className="mt-36"></div>
      <div className="flex justify-center">
        <div className="flex w-4/5">
          <div className="w-2/5 font-bold">購物車</div>
          <div className="flex w-3/5">
            <div className="w-1/4 font-bold text-center">數量</div>
            <div className="w-1/4 font-bold text-center">單價</div>
            <div className="w-1/4 font-bold text-center">小計</div>
            <div className="w-1/4 font-bold text-center"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <div className="flex-col w-4/5 border border-gray-400 border-solid border-1">
          {cartProducts.length > 0
            ? cartProducts.map((product) => (
                <div className="flex">
                  <div className="w-2/5 font-bold p-5">
                    <div className="flex">
                      <div className="w-1/3">
                        <img
                          src={product.main_image}
                          className="w-full"
                          alt=""
                        />
                      </div>
                      <div className="w-2/3 ml-2">
                        <div className="font-bold mb-2">{product.title}</div>
                        <div className="text-sm text-gray-500">
                          {product.product_id}
                        </div>
                        <div className="">
                          <div className="text-xs my-3">
                            顏色 | {product.color_name}
                          </div>
                          <div className="text-xs my-3">
                            尺寸 | {product.size}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-3/5">
                    <div className="w-1/4 font-bold flex items-center justify-center">
                      <select name="" id="" className="border border-black">
                        <option value="">{product.qty}</option>
                      </select>
                    </div>
                    <div className="w-1/4 font-bold flex items-center justify-center">
                      TWD.{product.price}
                    </div>
                    <div className="w-1/4 font-bold flex items-center justify-center">
                      TWD.{product.price * product.qty}
                    </div>
                    <div className="w-1/4 font-bold text-center"></div>
                  </div>
                </div>
              ))
            : "*購物車是空的"}
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <div className="w-4/5">
          <div className="font-bold mb-2">訂購資料</div>
          <div className="h-0.5 bg-gray-500"></div>
          <div className="flex-col w-3/5">
            <div className="flex w-full justify-between mt-5">
              <div>收件人姓名</div>
              <input
                type="text"
                value={userFormData.name}
                className="border border-gray-300 border-2 w-3/4 rounded-md focus:outline-none"
                onChange={(e) =>
                  setUserFormData({ ...userFormData, name: e.target.value })
                }
              ></input>
            </div>
            <div className="text-end text-red-500 font-bold">
              務必填寫完整收件人姓名，避免包裹無法順利簽收
            </div>
          </div>
          <div className="flex-col w-3/5">
            <div className="flex w-full justify-between mt-5">
              <div>手機</div>
              <input
                type="text"
                value={userFormData.name}
                className="border border-gray-300 border-2 w-3/4 rounded-md focus:outline-none"
                onChange={(e) =>
                  setUserFormData({ ...userFormData, phone: e.target.value })
                }
              ></input>
            </div>
          </div>
          <div className="flex-col w-3/5">
            <div className="flex w-full justify-between mt-5">
              <div>地址</div>
              <input
                type="text"
                value={userFormData.name}
                className="border border-gray-300 border-2 w-3/4 rounded-md focus:outline-none"
                onChange={(e) =>
                  setUserFormData({ ...userFormData, address: e.target.value })
                }
              ></input>
            </div>
          </div>
          <div className="flex-col w-3/5">
            <div className="flex w-full justify-between mt-5">
              <div>Email</div>
              <input
                type="text"
                value={userFormData.name}
                className="border border-gray-300 border-2 w-3/4 rounded-md focus:outline-none"
                onChange={(e) =>
                  setUserFormData({ ...userFormData, address: e.target.value })
                }
              ></input>
            </div>
          </div>
          <div className="flex-col w-3/5">
            <div className="flex w-full justify-between mt-5">
              <div>配送時間</div>
              <div className="w-3/4">
                <label>
                  <input
                    type="radio"
                    id="option1"
                    checked={userFormData.send_time === "08:00-12:00"}
                    onChange={(e) =>
                      setUserFormData({
                        ...userFormData,
                        send_time: "08:00-12:00",
                      })
                    }
                    className="mr-2"
                  ></input>
                  08:00-12:00
                </label>
                <label className="ml-10">
                  <input
                    type="radio"
                    id="option1"
                    checked={userFormData.send_time === "14:00-18:00"}
                    onChange={(e) =>
                      setUserFormData({
                        ...userFormData,
                        send_time: "14:00-18:00",
                      })
                    }
                    className="mr-2"
                  ></input>
                  14:00-18:00
                </label>
                <label className="ml-10">
                  <input
                    type="radio"
                    id="option1"
                    checked={userFormData.send_time === "不指定"}
                    onChange={(e) =>
                      setUserFormData({
                        ...userFormData,
                        send_time: "不指定",
                      })
                    }
                    className="mr-2"
                  ></input>
                  不指定
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
