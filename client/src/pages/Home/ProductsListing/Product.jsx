import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Product = ({ image, name, offer, tag, rating, assured }) => {
  const [wishlisted, setWishlisted] = useState(false);

  const toggleWishlist = (e) => {
    e.preventDefault(); // ✅ prevent navigation when clicking heart
    setWishlisted(!wishlisted);
  };

  return (
    <Link
      to="/products"
      className="relative flex flex-col items-center justify-between gap-2 p-6 cursor-pointer 
                 border rounded-2xl shadow-sm hover:shadow-md transition-all bg-white 
                 min-h-[280px]" // ✅ same height for all cards
    >
      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-gray-100"
      >
        <Heart
          className={`h-5 w-5 ${
            wishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="w-36 h-36 flex items-center justify-center">
        <img
          draggable="false"
          className="max-h-full max-w-full object-contain"
          src={image}
          alt={name}
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="font-medium text-sm mt-2">{name}</h2>
        {offer && <span className="text-primary-green text-sm">{offer}</span>}
        {tag && <span className="text-gray-500 text-sm">{tag}</span>}
      </div>

      {/* Ratings + Assured */}
      <div className="flex items-center gap-2 mt-1 text-sm">
        {rating && (
          <span className="flex items-center text-yellow-500 font-medium">
            ⭐ {rating.toFixed(1)}
          </span>
        )}
        {assured && (
          <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
            Assured
          </span>
        )}
      </div>
    </Link>
  );
};

export default Product;
