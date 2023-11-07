import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.css";

export default function Banner() {
  return (
    <>
      <img />
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={true}
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
      >
        <div>
          <img src="/assets/images/carousel-images/1.png" alt="Banner 1" />
        </div>
        <div>
          <img src="/assets/images/carousel-images/1.png" alt="Banner 2" />
        </div>
        <div>
          <img src="/assets/images/carousel-images/1.png" alt="Banner 3" />
        </div>
        {/* Add more slides as needed */}
      </Carousel>
    </>
  );
}
