import React, { useState, useEffect } from "react";
import useWindowWidth from "../../../hooks/useWindowWidth";

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
      <header className="flex py-5 bg-white-900 text-black">
        {/* left side of the header */}
        <div className="flex-1 flex justify-center items-center cursor-pointer-bar">
          {!isSearching ? (
            <div className="w-40 mx-10">
              <img src="/assets/images/icon-images/logo.png" alt="" />
            </div>
          ) : (
            ""
          )}

          {windowWidth > 1280 ? (
            <>
              <div
                className="mx-10"
                onClick={() => onSelectChange([0, "women"])}
              >
                女&nbsp;&nbsp;&nbsp;裝
              </div>
              |
              <div className="mx-10" onClick={() => onSelectChange([0, "men"])}>
                男&nbsp;&nbsp;&nbsp;裝
              </div>
              |
              <div
                className="mx-10"
                onClick={() => onSelectChange([0, "accessories"])}
              >
                配&nbsp;&nbsp;&nbsp;件
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        {windowWidth < 1280 ? (
          <div
            className="top-0 inset-y-0 right-3 items-center pl-3 mr-5"
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

            {isSearching ? (
              <input
                type="text"
                className="p-2 rounded-full border border-gray-300 focus:outline-none"
                placeholder="Search"
              ></input>
            ) : (
              ""
            )}
          </div>
        ) : (
          <></>
        )}
        {windowWidth > 1280 ? (
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
        ) : (
          ""
        )}
        {/* right side of the header */}
      </header>

      <div className="h-8 bg-black flex items-center text-white text-sm text-gray-400  cursor-pointer-bar">
        {windowWidth < 1280 ? (
          <>
            <div className="mx-10" onClick={() => onSelectChange([0, "women"])}>
              女&nbsp;&nbsp;&nbsp;裝
            </div>
            |
            <div className="mx-10" onClick={() => onSelectChange([0, "men"])}>
              男&nbsp;&nbsp;&nbsp;裝
            </div>
            |
            <div
              className="mx-10"
              onClick={() => onSelectChange([0, "accessories"])}
            >
              配&nbsp;&nbsp;&nbsp;件
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
