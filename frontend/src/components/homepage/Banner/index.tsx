import { Carousel } from "react-responsive-carousel";
import Swiper from "../Swiper";
import useWindowWidth from "../../../hooks/useWindowWidth";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.css";

export default function Banner() {
  const windowWidth = useWindowWidth();

  return (
    <>
      <Swiper
        direction={"horizontal"}
        speed={3}
        width={windowWidth}
        height={200}
        urls={[
          "/assets/images/carousel-images/1.png",
          "/assets/images/carousel-images/1.png",
          "/assets/images/carousel-images/1.png",
        ]}
      ></Swiper>
    </>
  );
}
