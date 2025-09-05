/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { getDiscount } from "../../../utils/functions";
import { Heart } from "lucide-react";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

const Product = (props) => {
  const {
    _id,
    name,
    price,
    discountPrice,
    images,
    ratings,
    numOfReviews,
    assured, // <-- new field
    func, // for updating/removing wishlist
  } = props;

  const [isProcessing, setIsProcessing] = useState(false);

  const handleWishlistAction = async () => {
    if (!func) return;
    setIsProcessing(true);
    try {
      await func(_id); // remove from wishlist
    } catch (error) {
      console.error("Wishlist update failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const shouldRenderImage = images && images.length > 0;

  return (
    <div className="flex gap-4 border-b p-4 sm:pb-8 w-full group overflow-hidden">
      {/* Product Image */}
      <div className="w-1/6 h-28 flex-shrink-0 relative">
        <img
          draggable="false"
          className="h-full w-full object-contain"
          src={shouldRenderImage ? images[0].url : ""}
          alt={name}
        />

        {/* Wishlist Button (Heart) */}
        <button
          onClick={handleWishlistAction}
          disabled={isProcessing}
          className="absolute top-2 right-2 p-1 rounded-full bg-white shadow hover:scale-110 transition-transform"
        >
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        </button>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-5 w-full p-1">
        {/* Title and Ratings */}
        <div className="flex justify-between items-start sm:pr-5">
          <Link to={`/product/${_id}`} className="flex flex-col gap-0.5">
            <p className="group-hover:text-primary-blue w-56 sm:w-full truncate">
              {name?.length > 70 ? `${name?.substring(0, 70)}...` : name}
            </p>

            {/* Rating Badge */}
            <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
              {ratings && (
                <span className="text-xs px-1.5 py-0.5 bg-[#22ba20] rounded-sm text-white flex items-center gap-0.5">
                  {ratings} <StarIcon sx={{ fontSize: "14px" }} />
                </span>
              )}
              {numOfReviews !== undefined && (
                <span>({numOfReviews?.toLocaleString()})</span>
              )}
              {assured && (
                <span>
                  <img
                    draggable="false"
                    className="w-[60px] h-[20px] ml-4 object-contain"
                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                    alt="Assured"
                  />
                </span>
              )}
            </span>
          </Link>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 text-2xl font-medium">
          <span>₹{discountPrice?.toLocaleString()}</span>
          <span className="text-sm text-gray-500 line-through font-normal mt-1">
            ₹{price?.toLocaleString()}
          </span>
          <span className="text-sm text-[#22ba20] mt-1">
            {getDiscount(price, discountPrice)}%&nbsp;off
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
