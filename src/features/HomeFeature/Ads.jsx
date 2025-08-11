import React from "react";

import banner1 from "../../assets/banner/banner-img.png";
import banner2 from "../../assets/banner/banner-img2.png";
import banner3 from "../../assets/banner/banner-img3.png";
import banner4 from "../../assets/banner/banner-img4.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    img: banner1,
    title: (
      <>
        <span className="block text-lg md:text-xl text-orange-500 font-semibold mb-2">
          Save 10 - 20% off
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight mb-4">
          Best destination for{" "}
          <span className="text-orange-500">your pets</span>
        </h2>
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow transition text-base md:text-lg mt-2"
        >
          Shop now
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </>
    ),
  },
  {
    img: banner2,
    title: (
      <>
        <span className="block text-lg md:text-xl text-orange-500 font-semibold mb-2">
          New Arrivals
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight mb-4">
          Trendy <span className="text-orange-500">Pet Accessories</span>
        </h2>
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow transition text-base md:text-lg mt-2"
        >
          Shop now
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </>
    ),
  },
  {
    img: banner3,
    title: (
      <>
        <span className="block text-lg md:text-xl text-orange-500 font-semibold mb-2">
          Best Seller
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight mb-4">
          Healthy <span className="text-orange-500">Pet Food</span>
        </h2>
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow transition text-base md:text-lg mt-2"
        >
          Shop now
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </>
    ),
  },
  {
    img: banner4,
    title: (
      <>
        <span className="block text-lg md:text-xl text-orange-500 font-semibold mb-2">
          Hot Deal
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight mb-4">
          Save big on <span className="text-orange-500">Pet Toys</span>
        </h2>
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow transition text-base md:text-lg mt-2"
        >
          Shop now
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </>
    ),
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000, // 3 giây
  pauseOnHover: true,
};

const Ads = () => {
  return (
    <section className="w-full bg-gradient-to-r from-orange-50 to-yellow-50 py-6 md:py-12">
      <div className="max-w-6xl mx-auto px-2 md:px-6">
        <Slider {...settings} className="slick-slider custom-slick-dots">
          {slides.map((slide, index) => (
            <div key={index}>
              <div className="flex flex-col md:flex-row items-center justify-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-6 md:p-10 gap-8 md:gap-16 min-h-[340px]">
                <div className="flex-1 flex justify-center">
                  <img
                    src={slide.img}
                    alt={`Slide ${index + 1}`}
                    className="w-full max-w-xs md:max-w-md rounded-xl object-contain drop-shadow-md"
                  />
                </div>
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                  {slide.title}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      
    </section>
  );
};

export default Ads;
