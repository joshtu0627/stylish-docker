import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import useWindowWidth from "../../../hooks/useWindowWidth";

import "./index.css";

type HeaderProps = {
  selectInfo: [number, string];
  onSelectChange: (select: [number, string]) => void;
};

export default function Header({
  selectInfo,
  onSelectChange,
  ...props
}: HeaderProps) {
  const [isMemberHover, setIsMemberHover] = useState(false);
  const [isCartHover, setIsCartHover] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const windowWidth = useWindowWidth();

  return (
    <>
      {windowWidth > 1280 ? (
        <div className="fixed top-0 w-full z-50 ">
          <header className="flex py-5 bg-white text-black h-20 w-full">
            {/* left side of the header */}
            <div className="flex-1 flex justify-center items-center cursor-pointer-bar">
              <div className="w-40 mx-10">
                <img src="/assets/images/icon-images/logo.png" alt="" />
              </div>
              <div
                className="mx-5 animated-btn"
                onClick={() => onSelectChange([0, "women"])}
              >
                女&nbsp;&nbsp;&nbsp;裝
              </div>
              |
              <div
                className="mx-5 animated-btn"
                onClick={() => onSelectChange([0, "men"])}
              >
                男&nbsp;&nbsp;&nbsp;裝
              </div>
              |
              <div
                className="mx-5 animated-btn"
                onClick={() => onSelectChange([0, "accessories"])}
              >
                配&nbsp;&nbsp;&nbsp;件
              </div>
            </div>

            <div className="flex-1 flex justify-end mx-5  cursor-pointer-bar">
              <div className="relative">
                {/* search text field */}

                <input
                  type="text"
                  className="p-2 rounded-full border border-gray-300 focus:outline-none"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                ></input>
                <div
                  className="absolute inset-y-0 right-3 flex items-center pl-3"
                  onClick={() => {
                    onSelectChange([1, searchText]);
                  }}
                >
                  <img
                    src="/assets/images/icon-images/search.png"
                    className="icon-size object-cover object-center"
                    alt=""
                  />
                </div>
              </div>
              <div
                onMouseEnter={() => setIsCartHover(true)}
                onMouseLeave={() => setIsCartHover(false)}
                className="flex items-center mx-3"
              >
                <img
                  src={
                    isCartHover
                      ? "/assets/images/icon-images/cart-hover.png"
                      : "/assets/images/icon-images/cart.png"
                  }
                  className="icon-size object-cover object-center"
                  alt=""
                />
              </div>
              <div
                onMouseEnter={() => setIsMemberHover(true)}
                onMouseLeave={() => setIsMemberHover(false)}
                className="flex items-center mx-3"
              >
                <img
                  src={
                    isMemberHover
                      ? "/assets/images/icon-images/member-hover.png"
                      : "/assets/images/icon-images/member.png"
                  }
                  className="icon-size object-cover object-center"
                  alt=""
                />
              </div>
            </div>
          </header>
          <div className="h-8 bg-black flex items-center text-white text-sm text-gray-400 z-50 cursor-pointer-bar w-full"></div>
        </div>
      ) : (
        <>
          <div className="fixed top-0 w-full z-50 ">
            <header className="flex py-5 bg-white h-20  text-black">
              {/* left side of the header */}

              {!isSearching ? (
                <div className="flex-1 flex justify-center items-center cursor-pointer-bar">
                  <div className="w-40 mx-10">
                    <img src="/assets/images/icon-images/logo.png" alt="" />
                  </div>
                </div>
              ) : (
                ""
              )}

              <div
                className="flex top-0 inset-y-0 right-3 items-center pl-3 mr-5"
                onClick={() => {
                  setIsSearching(!isSearching);
                }}
              >
                {!isSearching ? (
                  <img
                    src="/assets/images/icon-images/search.png"
                    className="icon-size object-cover object-center"
                    alt=""
                  />
                ) : (
                  ""
                )}
              </div>

              {isSearching ? (
                <div className="flex flex-1 justify-center items-center">
                  <div
                    className="m-2"
                    onClick={() => {
                      setIsSearching(false);
                    }}
                  >
                    <RxCross1 />
                  </div>
                  <input
                    type="text"
                    className="p-2 rounded-full border border-gray-300 focus:outline-none"
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                    style={{ width: "60vw" }}
                  ></input>
                  <div className="m-2">
                    <img
                      src="/assets/images/icon-images/search.png"
                      className="icon-size object-cover object-center mr-5"
                      alt=""
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        onSelectChange([1, searchText]);
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* right side of the header */}
            </header>

            <div className="h-8 bg-black flex items-center justify-center text-white text-sm text-gray-400  cursor-pointer-bar">
              <div
                className="pr-10"
                style={{ borderRight: "1px solid white" }}
                onClick={() => onSelectChange([0, "women"])}
              >
                女&nbsp;&nbsp;&nbsp;裝
              </div>
              <div
                className="pr-10  ml-10"
                style={{ borderRight: "1px solid white" }}
                onClick={() => onSelectChange([0, "men"])}
              >
                男&nbsp;&nbsp;&nbsp;裝
              </div>
              <div
                className="pr-10  ml-10"
                onClick={() => onSelectChange([0, "accessories"])}
              >
                配&nbsp;&nbsp;&nbsp;件
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
