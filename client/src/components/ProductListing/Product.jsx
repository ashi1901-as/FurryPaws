/* src/components/ProductListing/Product.jsx */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import { getDiscount } from "../../utils/functions";
import { useState } from "react";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Product = ({
  _id,
  images = [],
  name,
  ratings = 0,
  numOfReviews = 0,
  price,
  discountPrice,
  wishlistItems = [],
  setWishlistItems,
  assured = false,
}) => {
  const { auth, isAdmin } = useAuth();
  const [loadingHeart, setLoadingHeart] = useState(false);

  // check if item present in wishlist
  const itemInWishlist = wishlistItems?.some((itemId) => itemId === _id);

  // optimistic UI
  const updateWishlistUI = (add) => {
    setWishlistItems((prev) =>
      add ? [...prev, _id] : prev.filter((item) => item !== _id)
    );
  };

  const addToWishlistHandler = async (e) => {
    // prevent click from bubbling to product link
    e && e.stopPropagation && e.stopPropagation();
    e && e.preventDefault && e.preventDefault();

    if (!auth?.token) {
      toast.info("Please login to use wishlist");
      return;
    }
    if (isAdmin) {
      toast.error("Admins are not allowed to add items to the wishlist");
      return;
    }

    const type = itemInWishlist ? "remove" : "add";
    try {
      setLoadingHeart(true);
      updateWishlistUI(type === "add");

      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-wishlist`,
        { productId: _id, type },
        { headers: { Authorization: auth.token } }
      );
      setLoadingHeart(false);
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Something went wrong. Please try again.");
      // revert
      updateWishlistUI(type !== "add");
      setLoadingHeart(false);
    }
  };

  // build 5 stars UI (rounded)
  const rounded = Math.round(Number(ratings) || 0);
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < rounded ? (
      <StarIcon key={i} sx={{ fontSize: 14, color: "#f6c941" }} />
    ) : (
      <StarBorderIcon key={i} sx={{ fontSize: 14, color: "#cbd5e1" }} />
    )
  );

  return (
    <>
      <ScrollToTopOnRouteChange />
      <div className="relative">
        {/* wishlist badge */}
        {!isAdmin && (
          <button
            onClick={addToWishlistHandler}
            aria-label={
              itemInWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
            className={`absolute z-10 top-2 right-3 p-1 rounded ${
              itemInWishlist
                ? "text-red-500"
                : "text-gray-300 hover:text-red-500"
            }`}
          >
            {itemInWishlist ? (
              <FavoriteIcon sx={{ fontSize: 20 }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 20 }} />
            )}
          </button>
        )}

        <Link to={`/product/${_id}`} className="block">
          <div className="flex flex-col items-center gap-2 w-full px-4 py-6 relative hover:shadow-lg rounded-sm bg-white">
            <div className="w-44 h-48">
              <img
                draggable="false"
                className="w-full h-full object-contain"
                src={images && images[0]?.url}
                alt={name}
              />
            </div>

            <div className="flex flex-col gap-2 items-start w-full">
              <h2 className="text-sm leading-6 font-[500] mt-4 group-hover:text-primary-blue text-left">
                {name?.length > 25 ? `${name.substring(0, 25)}...` : name}
              </h2>

              {/* rating block */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="flex items-center bg-[#22ba20] text-white px-1 rounded-sm">
                  <span className="text-xs font-medium">
                    {Number(ratings || 0).toFixed(1)}
                  </span>
                  <StarIcon sx={{ fontSize: 14, marginLeft: 0.5 }} />
                </div>
                <span className="text-xs">({numOfReviews || 0})</span>

                {/* Assured badge - show only when product.assured === true */}
                {assured && (
                  <img
                    draggable="false"
                    className="w-[60px] h-[20px] ml-4 object-contain"
                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                    alt="Assured"
                  />
                )}
              </div>

              {/* price */}
              <div className="flex items-center gap-1.5 text-md font-medium mt-1">
                <span>₹{Number(discountPrice).toLocaleString()}</span>
                <span className="text-gray-500 line-through text-xs">
                  ₹{Number(price).toLocaleString()}
                </span>
                <span className="text-xs text-primary-green">
                  {getDiscount(price, discountPrice)}% off
                </span>
              </div>

              {/* visual star row (small) */}
              <div className="mt-1">{stars}</div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Product;
