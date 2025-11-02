/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { getDiscount } from "../../utils/functions";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import fAssuredImage from "../../assets/images/fassured.png";

const Product = ({
    _id,
    images,
    name,
    ratings,
    numOfReviews,
    price,
    discountPrice,
    fAssured, // <--- keep this
}) => {

    return (
        <>
            <ScrollToTopOnRouteChange />
            <div className="relative">
                <div className="flex flex-col items-center gap-2 w-full px-4 py-6 relative hover:shadow-lg rounded-sm">
                    <Link
                        to={`/product/${_id}`}
                        className="flex flex-col items-center w-full text-center group"
                    >
                        <div className="w-44 h-48">
                            <img
                                draggable="false"
                                className="w-full h-full object-contain"
                                src={images && images[0]?.url}
                                alt={name}
                            />
                        </div>
                    </Link>

                    <div className="flex flex-col gap-2 items-start w-full">
                        <h2 className="text-sm leading-6 font-[500] mt-4 group-hover:text-primary-blue text-left">
                            {name.length > 25
                                ? `${name.substring(0, 25)}...`
                                : name}
                        </h2>

                        <span className="text-sm text-gray-500 font-medium flex gap-2 items-start justify-between">
                            <span className="text-xs px-1.5 py-0.5 bg-[#22ba20] rounded-sm text-white flex items-center gap-0.5">
                                {ratings.toFixed(1)}
                                <StarIcon sx={{ fontSize: "14px" }} />
                            </span>
                            <span>({numOfReviews})</span>
                            
                            {fAssured && (
                                <span>
                                    <img
                                        draggable="false"
                                        className="w-[60px] h-[20px] ml-4 object-contain"
                                        src={fAssuredImage}
                                        alt={name}
                                    />
                                </span>
                            )}
                        </span>

                        <div className="flex items-center gap-1.5 text-md font-medium">
                            <span>₹{discountPrice.toLocaleString()}</span>
                            <span className="text-gray-500 line-through text-xs">
                                ₹{price.toLocaleString()}
                            </span>
                            <span className="text-xs text-primary-green">
                                {getDiscount(price, discountPrice)}%&nbsp;off
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
