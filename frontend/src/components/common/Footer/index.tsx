export default function Footer() {
  return (
    <footer className="flex items-center py-5 bg-gray-900 text-gray-200 text-xs h-24">
      <div className="w-3/5 flex justify-end">
        <div className="mr-5">
          <a href="#">關於 STYLiSH</a>
        </div>
        |
        <div className="mx-5">
          <a href="#">服務條款</a>
        </div>
        |
        <div className="mx-5">
          <a href="#">隱私政策</a>
        </div>
        |
        <div className="mx-5">
          <a href="#">聯絡我們</a>
        </div>
        |
        <div className="mx-5">
          <a href="#">FAQ</a>
        </div>
      </div>

      <div className="w-2/5 flex justify-center">
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
  );
}
