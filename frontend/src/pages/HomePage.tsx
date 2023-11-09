import React, { useState, useEffect } from "react";

import Header from "../components/common/Header";
import Banner from "../components/homepage/Banner";
import ProductGrid from "../components/homepage/ProductGrid";
import Footer from "../components/common/Footer";

type SelectInfo = [number, string];

export default function HomePage() {
  const [selectInfo, setSelectInfo] = useState<SelectInfo>([0, ""]);

  const handleSelectChange = (selectInfo: [number, string]) => {
    setSelectInfo(selectInfo);
  };
  useEffect(() => {
    console.log("start");
  }, []);

  return (
    <>
      <Header selectInfo={selectInfo} onSelectChange={handleSelectChange} />
      <Banner />
      <ProductGrid selectInfo={selectInfo} />
      <Footer />
    </>
  );
}
