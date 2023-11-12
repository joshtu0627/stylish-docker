import useWindowWidth from "../../../hooks/useWindowWidth";

export default function Footer() {
  const windowWidth = useWindowWidth();

  return (
    <>
      {windowWidth > 1280 ? (
        <footer
          //  desktop's footer
          className="flex items-center justify-center py-5 bg-gray-900 text-gray-200 text-xs h-24"
          style={{ color: "#D3D3D3" }}
        >
          <div className="flex mx-10" style={{ marginRight: "5vh" }}>
            <div className="pr-5" style={{ borderRight: "1px solid #D3D3D3" }}>
              <a href="/">關於 STYLiSH</a>
            </div>
            <div
              className=" ml-5 pr-5"
              style={{ borderRight: "1px solid #D3D3D3" }}
            >
              <a href="/">服務條款</a>
            </div>
            <div
              className=" ml-5 pr-5"
              style={{ borderRight: "1px solid #D3D3D3" }}
            >
              <a href="/">隱私政策</a>
            </div>
            <div
              className=" ml-5 pr-5"
              style={{ borderRight: "1px solid #D3D3D3" }}
            >
              <a href="/">聯絡我們</a>
            </div>
            <div className=" ml-5 pr-5">
              <a href="/">FAQ</a>
            </div>
          </div>

          <div className="flex" style={{ marginLeft: "5vh" }}>
            <div className="flex items-center mx-3">
              <img
                src="/assets/images/icon-images/line.png"
                className="w-10 h-10"
                alt=""
              />
            </div>
            <div className="flex items-center mx-3">
              <img
                src="/assets/images/icon-images/twitter.png"
                className="w-10 h-10"
                alt=""
              />
            </div>
            <div className="flex items-center mx-3">
              <img
                src="/assets/images/icon-images/facebook.png"
                className="w-10 h-10"
                alt=""
              />
            </div>
            <div className="flex items-center text-gray-500 text-center ml-5">
              @ 2018, All rights reserved.{" "}
            </div>
          </div>
        </footer>
      ) : (
        // mobile's footer
        <footer className="bg-gray-900 text-gray-200 text-xs h-auto">
          <div className="py-5 flex">
            <div className="flex w-3/5">
              <div className="flex-1 text-center">
                <div className="mb-3">
                  <a href="#">關於 STYLiSH</a>
                </div>
                <div className="mb-3">
                  <a href="#">服務條款</a>
                </div>
                <div className="mb-3">
                  <a href="#">隱私政策</a>
                </div>
              </div>
              <div className="flex-1 text-center ">
                <div className="mb-3">
                  <a href="#">聯絡我們</a>
                </div>
                <div className="mb-3">
                  <a href="#">FAQ</a>
                </div>
              </div>
            </div>

            <div className="flex justify-center w-2/5">
              <div className="flex items-center mx-3">
                <img
                  src="/assets/images/icon-images/line.png"
                  className="w-5 h-5"
                  alt=""
                />
              </div>
              <div className="flex items-center mx-3">
                <img
                  src="/assets/images/icon-images/twitter.png"
                  className="w-5 h-5"
                  alt=""
                />
              </div>
              <div className="flex items-center mx-3">
                <img
                  src="/assets/images/icon-images/facebook.png"
                  className="w-5 h-5"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500 text-center ml-5">
            @ 2018, All rights reserved.{" "}
          </div>
          <div className="flex">
            <div className="flex-1 flex p-4 text-center items-center justify-center">
              <img
                src="/assets/images/icon-images/cart.png"
                style={{ filter: "brightness(5)" }}
              ></img>
              <div>購物車</div>
            </div>

            <div className="flex-1 flex p-4 text-center items-center justify-center">
              <img
                src="/assets/images/icon-images/member.png"
                style={{ filter: "brightness(5)" }}
              ></img>
              <div>會員</div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
