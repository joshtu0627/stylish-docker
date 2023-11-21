import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import useWindowWidth from "../hooks/useWindowWidth";

import CartProduct from "../types/CartProduct";

export default function CartPage() {
  const windowWidth = useWindowWidth();

  const { number, total, time } = useParams();

  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    send_time: "",
  });

  return (
    <>
      <Header />
      <div className="mt-32"></div>
      <div className="flex justify-center font-bold h-72">
        謝謝您的購買，您的訂單編號為：{number}，總金額為：{total}
        ，下單時間為：{time}
      </div>

      <div className="flex items-"></div>
      <Footer />
    </>
  );
}
