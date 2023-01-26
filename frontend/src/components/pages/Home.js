import { Container } from "@mui/material";
import React from "react";
import { Navbar } from "../base/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import { SwiperData } from "../../data/home";
import banner from "../../assets/i/banner.png";

export const Home = () => {
  return (
    <div className="app_container">
      <Navbar />
      <Swiper
        modules={[Navigation]}
        cssMode={true}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        className="mySwiper"
      >
        {SwiperData?.map((data, i) => (
          <SwiperSlide key={i}>
            <div className="swiper__container">
              <img src={data.img} alt="" className="swiper_img" />
              <div className="swiper__data">
                <h2 className="swiper_heading">{data?.heading}</h2>
                <p className="swiper_text">{data?.text}</p>
                <p className="swiper_quotes">
                  {data.quote}{" "}
                  <span className="swiper_quote_person">{data.person}</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Container></Container>
    </div>
  );
};
