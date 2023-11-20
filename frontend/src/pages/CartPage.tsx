import React, { useState, useEffect } from "react";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import CartProduct from "../types/CartProduct";

export default function CartPage() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    send_time: "",
  });

  const [total, setTotal] = useState(0);

  const storage = window.localStorage;

  useEffect(() => {
    console.log("storage", storage.getItem("cart"));
    TPDirect.setupSDK(
      12348,
      "app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF",
      "sandbox"
    );
    TPDirect.card.setup({
      // Display ccv field
      fields: {
        number: {
          // css selector
          element: "#card-number",
          placeholder: "**** **** **** ****",
        },
        expirationDate: {
          // DOM object
          element: document.getElementById("card-expiration-date"),
          placeholder: "MM / YY",
        },
        ccv: {
          element: "#card-ccv",
          placeholder: "ccv",
        },
      },

      styles: {
        // Style all elements
        input: {
          color: "gray",
        },
        // Styling ccv field
        "input.ccv": {
          // 'font-size': '16px'
        },
        // Styling expiration-date field
        "input.expiration-date": {
          // 'font-size': '16px'
        },
        // Styling card-number field
        "input.card-number": {
          // 'font-size': '16px'
        },
        // style focus state
        ":focus": {
          // 'color': 'black'
        },
        // style valid state
        ".valid": {
          color: "green",
        },
        // style invalid state
        ".invalid": {
          color: "red",
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        "@media screen and (max-width: 400px)": {
          input: {
            color: "orange",
          },
        },
      },
      // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
      isMaskCreditCardNumber: true,
      maskCreditCardNumberRange: {
        beginIndex: 6,
        endIndex: 11,
      },
    });
    setCartProducts(JSON.parse(storage.getItem("cart") || "[]"));
  }, []);

  useEffect(() => {
    function countTotal() {
      let total = 0;
      cartProducts.forEach((product) => {
        total += product.price * product.qty;
      });
      setTotal(total);
    }
    countTotal();
  }, [cartProducts]);

  function deleteProduct(id: number) {
    console.log("id", id);

    storage.setItem(
      "cart",
      JSON.stringify(
        cartProducts.filter((product) => product.product_id !== id)
      )
    );
    const event = new Event("customStorageChange");
    window.dispatchEvent(event);
    console.log();

    setCartProducts(JSON.parse(storage.getItem("cart") || "[]"));
  }

  function setAmount(amount: number, id: number) {
    const newCartProducts = cartProducts.map((product) => {
      if (product.product_id === id) {
        return { ...product, qty: amount };
      } else {
        return product;
      }
    });

    storage.setItem("cart", JSON.stringify(newCartProducts));
    const event = new Event("customStorageChange");
    window.dispatchEvent(event);
    setCartProducts(JSON.parse(storage.getItem("cart") || "[]"));
  }

  function createPayment() {
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();
    console.log(tappayStatus);

    // Check TPDirect.card.getTappayFieldsStatus().canGetPrime before TPDirect.card.getPrime
    if (tappayStatus.canGetPrime === false) {
      alert("can not get prime");
      return;
    }
    TPDirect.card.getPrime((result) => {
      if (result.status !== 0) {
        console.error("獲取 Prime 失敗:", result.msg);
        return;
      }
      const prime = result.card.prime;
      console.log("prime", prime);
      // 使用 prime 進行支付流程，例如發送給後端服務器
    });
  }

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
                      <select
                        name=""
                        id=""
                        className="border border-black"
                        onChange={(e) => {
                          setAmount(e.target.value, product.product_id);
                        }}
                        value={product.qty}
                      >
                        {Array.from({ length: product.stock }, (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-1/4 font-bold flex items-center justify-center">
                      TWD.{product.price}
                    </div>
                    <div className="w-1/4 font-bold flex items-center justify-center">
                      TWD.{product.price * product.qty}
                    </div>
                    <div className="w-1/4 font-bold flex items-center justify-center cursor-pointer">
                      <div
                        onClick={() => {
                          deleteProduct(product.product_id);
                        }}
                      >
                        <img
                          src="/assets/images/icon-images/cart-remove.png"
                          alt=""
                        />
                      </div>
                    </div>
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
          <div className="font-bold mt-10">訂購資料</div>
          <div className="h-0.5 bg-gray-500"></div>
          <div className="flex-col w-3/5">
            <div
              className="flex w-full justify-between mt-5 tpfield"
              id="card-number"
            >
              {/* <div>信用卡號碼</div> */}
              {/* <input
                type="text"
                className="border border-gray-300 border-2 w-3/4 rounded-md focus:outline-none"
              ></input> */}
            </div>
          </div>
          <div className="flex-col w-3/5">
            <div
              className="flex w-full justify-between mt-5  tpfield"
              id="card-expiration-date"
            >
              {/* <div>有效期限</div>
              <input
                type="text"
                className="expiration-date border border-gray-300 border-2 w-3/4 rounded-md focus:outline-none"
              ></input> */}
            </div>
          </div>
          <div className="flex-col w-3/5">
            <div
              className="flex w-full justify-between my-5  tpfield"
              id="card-ccv"
            >
              {/* <div>安全碼</div>
              <input
                type="text"
                className="ccv border border-gray-300 border-2 w-3/4 rounded-md focus:outline-none"
              ></input> */}
            </div>
          </div>
          <div className="flex justify-end my-10">
            <div className="w-72">
              <div className="flex-col  font-bold">
                <div className="flex justify-between my-3">
                  <div>總金額</div>
                  <div>
                    NT.
                    <span className="text-xl"> {total}</span>
                  </div>
                </div>
                <div className="flex justify-between my-3">
                  <div>運費</div>
                  <div>
                    NT.
                    <span className="text-xl"> 30</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full h-0.5 bg-black"></div>
                </div>
                <div className="flex justify-between my-3">
                  <div>應付金額</div>
                  <div>
                    NT.
                    <span className="text-xl"> {total + 30}</span>
                  </div>
                </div>
              </div>
              <div
                className="h-16 bg-black mt-14 text-white flex justify-center items-center"
                onClick={() => {
                  createPayment();
                }}
              >
                <div>確 認 付 款</div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
