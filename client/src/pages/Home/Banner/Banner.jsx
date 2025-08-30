/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const heroImage =
  "https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80";

export const PreviousBtn = ({ className, onClick }) => (
  <div className={className} onClick={onClick}>
    <ArrowBackIosIcon />
  </div>
);

export const NextBtn = ({ className, onClick }) => (
  <div className={className} onClick={onClick}>
    <ArrowForwardIosIcon />
  </div>
);

const Banner = () => {
  const sliderRef = useRef(null);

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    adaptiveHeight: true, // Makes it adjust height on resize
  };

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        sliderRef.current.slickPause();
        sliderRef.current.slickPlay();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="banner-section">
      <Slider ref={sliderRef} {...settings}>
        <div className="hero-slide">
          <div className="hero-container">
            <div className="hero-content">
              <h2>Wellness, One Woof at a Time</h2>
              <p>
                Luxury pet spa products & personalized subscription boxes for
                your furry friend.
              </p>
              <div className="hero-buttons">
                <a href="#newsletter" className="btn btn-primary">
                  Read and Learn about your pets
                </a>
                <a href="#shop" className="btn btn-secondary">
                  Shop Products
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img src={heroImage} alt="Dog enjoying spa treatment" />
            </div>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default Banner;
