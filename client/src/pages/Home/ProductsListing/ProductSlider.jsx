/* eslint-disable react/prop-types */
import Product from "./Product";
import Slider from "react-slick";
import { NextBtn, PreviousBtn } from "../Banner/Banner";
import { Link } from "react-router-dom";

export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  swipe: true,
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 600, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const ProductSlider = ({ title, products, logo }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Left side: title + CTA */}
        <div className="flex flex-col items-center md:items-start md:w-[20%] gap-4">
          <h1 className="text-xl font-semibold text-gray-700">{title}</h1>
          <Link
            to="/products"
            className="bg-[#f2c4bb] hover:bg-[#e6a99f] transition-colors text-sm font-medium text-white px-4 py-2 rounded-full shadow-sm"
          >
            View All
          </Link>
          {logo && (
            <img
              src={logo}
              alt="category"
              className="hidden md:block w-full rounded-xl mt-4"
            />
          )}
        </div>

        {/* Right side: products */}
        <div className="w-full md:w-[80%]">
          <Slider {...settings}>
            {products?.map((item, i) => (
              <Product {...item} key={i} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
