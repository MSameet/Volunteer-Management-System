import { Typography } from "@mui/material";
import React from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import img_2 from "../../assets/i/churchill.jpg";
import img_3 from "../../assets/i/coehlo.jpeg";
import img_1 from "../../assets/i/gandhi.jpg";
import img_4 from "../../assets/i/pablo.webp";
import quote from "../../assets/i/quote.png";

function Main() {
  return (
    <main>
      <div className="text-center mt-3 container">
        {/* <h4 className="title"></h4> */}
        <Typography
          variant="h3"
          component="h3"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            fontFamily: "Ubuntu, sans-serif",
            "@media (max-width:768px)": {
              // fontSize: "22px",
            },
          }}
          mb={5}
        >
          Happy People
        </Typography>
        <h2>What They Say</h2>
      </div>
      <section className="mt-4">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={20}
          loop={true}
          className="mySwiper pb-5  "
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            592: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },

            1092: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          <SwiperSlide>
            <div className="box">
              <div className="box__quote">
                {" "}
                <img src={quote} alt="" srcset="" />
              </div>
              <div className="box__text">
                <p>
                  The best way to find yourself is to lose yourself in the
                  service of others.
                </p>
                <h3>- Gandhi</h3>
              </div>
              <div className="box__authorimg">
                <img src={img_1} alt="" />
              </div>
            </div>

            {/* <ArticalCard /> */}
          </SwiperSlide>
          <SwiperSlide>
            <div className="box">
              <div className="box__quote">
                {" "}
                <img src={quote} alt="" srcset="" />
              </div>
              <div className="box__text">
                <p>
                  We make a living by what we get. We make a life by what we
                  give.
                </p>
                <h3>- Winston Churchill</h3>{" "}
              </div>
              <div className="box__authorimg">
                <img src={img_2} alt="" />
              </div>
            </div>

            {/* <ArticalCard /> */}
          </SwiperSlide>
          <SwiperSlide>
            <div className="box">
              <div className="box__quote">
                {" "}
                <img src={quote} alt="" srcset="" />
              </div>
              <div className="box__text">
                <p>
                  The meaning of life is to find your gift. The purpose of life
                  is to give it away.
                </p>
                <h3>- Pablo Picasso</h3>{" "}
              </div>
              <div className="box__authorimg">
                <img src={img_4} alt="" />
              </div>
            </div>

            {/* <ArticalCard /> */}
          </SwiperSlide>
          <SwiperSlide>
            <div className="box">
              <div className="box__quote">
                {" "}
                <img src={quote} alt="" srcset="" />
              </div>
              <div className="box__text">
                <p>
                  The world is changed by your example, not by your opinion.
                </p>
                <h3>- Paulo Coelho</h3>{" "}
              </div>
              <div className="box__authorimg">
                <img src={img_3} alt="" />
              </div>
            </div>

            {/* <ArticalCard /> */}
          </SwiperSlide>
        </Swiper>
      </section>
    </main>
  );
}

export default Main;
