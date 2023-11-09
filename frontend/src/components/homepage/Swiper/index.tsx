import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const MainSwiper = styled.div`
  overflow: hidden;
  position: relative;
`;

const SwiperContainer = styled.div`
  position: relative;
  width: auto;
  display: flex;
  align-item: center;
  justify-content: flex-start;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
`;

const SwiperSlide = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  flex-shrink: 0;
`;

const SwiperSlideBar = styled.div`
  margin-top: 16px;
  width: 100%;
  height: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const SwiperSlideBarItem: any = styled.div`
  cursor: pointer;
  width: ${(props: any) => (props.isActive ? "26px" : "16px")};
  height: 4px;
  background: #fff;
  margin-right: 6px;
  border-radius: 2px;
  border: 1px solid black;
  z-index: 100;
`;

export default function Swiper({
  direction,
  autoplay,
  speed,
  width,
  height,
  urls,
}: {
  direction: string;
  speed: number;
  width: number;
  height: number;
  urls: string[];
}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDone, setDone] = useState<boolean>(false);

  const timer = useRef<any>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);

  const startPlaySwiper = () => {
    console.log("speed", speed);
    console.log(width);

    if (speed <= 0) return;
    timer.current = setInterval(() => {
      setActiveIndex((preValue) => preValue + 1);
    }, speed * 1000);
  };

  const slideToOne = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    clearInterval(timer?.current);
    startPlaySwiper();
  };

  useEffect(() => {
    startPlaySwiper();
    return () => {
      clearInterval(timer.current);
      timer.current = null;
    };
  }, []);

  useEffect(() => {
    const swiper = document.querySelector("#swiper-container") as any;

    console.log("swiper", swiper);

    // 根据用户传入的轮播方向，决定是在bottom上变化还是right变化
    if (direction === "vertical") {
      // 兼容用户输入百分比的模式
      swiper.style.bottom = (height as string)?.includes("%")
        ? `${activeIndex * +(height as string)?.replace("%", "")}vh`
        : `${activeIndex * +height}px`;
    } else {
      swiper.style.right = `${activeIndex * +width}px`;
      console.log("width", width);

      console.log(swiper.style.right);
    }
    // 判断如果到达最后一张，停止自动轮播
    if (activeIndex >= urls.length) {
      setActiveIndex(0);
      // clearInterval(timer?.current);
      // timer.current = null;
      // setDone(true);
    }
    console.log("activeIndex", activeIndex);
  }, [activeIndex, urls]);

  return (
    <>
      <MainSwiper style={{ width, height }}>
        <SwiperContainer
          ref={swiperContainerRef}
          id="swiper-container"
          style={{
            height,
            width,
            flexDirection: direction === "vertical" ? "column" : "row",
          }}
        >
          {urls.map((f: string, index: number) => (
            <SwiperSlide
              style={{
                width: width,
                display: "block",
              }}
            >
              <img
                src={f}
                style={{ width: "100%", height: "auto", overflow: "hidden" }}
                alt=""
              />
            </SwiperSlide>
          ))}
        </SwiperContainer>
      </MainSwiper>
      <SwiperSlideBar>
        {urls?.map((f: string, index: number) => (
          <SwiperSlideBarItem
            onClick={() => slideToOne(index)}
            isActive={index === activeIndex}
          ></SwiperSlideBarItem>
        ))}
      </SwiperSlideBar>
    </>
  );
}
