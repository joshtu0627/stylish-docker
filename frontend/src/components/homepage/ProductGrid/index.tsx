import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

import ProductCard from "../ProductCard";
import Product from "../../../types/Product";
import useWindowWidth from "../../../hooks/useWindowWidth";

type ProductGridProps = {
  selectInfo: [number, string];
};

async function fetchProducts(selectInfo: [number, string], pageParam: number) {
  if (selectInfo[0] === 0) {
    const response = await fetch(
      `https://13.236.23.10:8000/api/1.0/products/${selectInfo[1]}?paging=${pageParam}`
    );
    response.data = await response.json();
    return response.data;
  } else {
    const response = await fetch(
      `https://13.236.23.10:8000/api/1.0/products/search?keyword=${selectInfo[1]}&paging=${pageParam}`
    );
    response.data = await response.json();
    return response.data;
  }
}

export default function ProductGrid({ selectInfo }: ProductGridProps) {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products", selectInfo],
      queryFn: ({ pageParam = 0 }) => fetchProducts(selectInfo, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.next_paging,
    });
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <>
      <div className="my-16 flex justify-center w-full">
        <div className={windowWidth > 1280 ? "w-4/5" : ""}>
          <div
            className={
              "grid " + (windowWidth > 1280 ? "grid-cols-3" : " grid-cols-2")
            }
          >
            {data?.pages.map((page, i) => (
              <>
                {page.data.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
      {/* infinite scroll */}
      <div ref={ref} />
    </>
  );
}
