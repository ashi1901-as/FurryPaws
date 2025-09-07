/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Product = ({ _id, name, price, discountPrice, images, brand }) => {
  return (
    <div className="p-3">
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition duration-200 overflow-hidden">
        {/* ✅ Product Image */}
        <Link to={`/product/${_id}`}>
          {images?.[0]?.url ? (
            <img
              src={images[0].url}
              alt={name}
              className="h-40 w-full object-contain p-2"
              onError={(e) =>
                (e.target.outerHTML = `<div class='h-40 w-full flex items-center justify-center text-gray-500 text-sm'>Not Available</div>`)
              }
            />
          ) : (
            <div className="h-40 w-full flex items-center justify-center text-gray-500 text-sm">
              Not Available
            </div>
          )}
        </Link>

        <div className="p-3">
          {/* ✅ Brand Logo */}
          {brand?.logo?.url && (
            <img
              src={brand.logo.url}
              alt={brand.name}
              className="h-6 mb-2 object-contain"
            />
          )}

          {/* ✅ Product Title */}
          <h3 className="text-sm font-medium text-gray-700 truncate">
            {name}
          </h3>

          {/* ✅ Price Section */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-semibold text-green-600">
              ₹{discountPrice}
            </span>
            {price > discountPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{price}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
