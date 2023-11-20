import React, { useState, useEffect } from "react";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import useWindowWidth from "../hooks/useWindowWidth";

import CartProduct from "../types/CartProduct";

export default function CartPage() {
  const windowWidth = useWindowWidth();

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
      <div className="h-72 font-bold flex justify-center">
        謝謝您的購買，您的訂單編號為：123456789，您的付款時間為：2021-01-01
        12:00:00
      </div>

      <div className="flex items-"></div>
      <Footer />
    </>
  );
}
