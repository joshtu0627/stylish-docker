import React, { useEffect, useState } from "react";

import ProductCard from "../ProductCard";
import Product from "../../../types/Product";
import useWindowWidth from "../../../hooks/useWindowWidth";

type ProductGridProps = {
  selectInfo: [number, string];
};

export default function ProductGrid({ selectInfo }: ProductGridProps) {
  // fetch backend to get product data
  //   i am using typescript here
  const [products, setProducts] = useState<Product[]>([]);

  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (selectInfo[0] === 0) {
      fetch(`http://127.0.0.1:8000/api/1.0/products/${selectInfo[1]}?paging=0`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);

          setProducts(data.data);
        });
    } else {
      console.log(selectInfo[1]);

      // translate the keyword to url format

      fetch(
        `http://127.0.0.1:8000/api/1.0/products/search?keyword=${selectInfo[1]}&paging=0`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);

          setProducts(data.data);
        });
    }
  }, [selectInfo[0], selectInfo[1]]);
  return (
    <div className="my-8 flex justify-center mx-5">
      <div className={windowWidth > 1280 ? "w-3/5" : ""}>
        <div
          className={
            "grid gap-4" + (windowWidth > 480 ? " grid-cols-3" : " grid-cols-2")
          }
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
