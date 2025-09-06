/* eslint-disable react/jsx-key */
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import Product from "../../components/ProductListing/Product";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./../../components/Spinner";
import axios from "axios";
import SeoData from "../../SEO/SeoData";
import SideFilter from "../../components/ProductListing/SideFilter";
import { useAuth } from "../../context/auth";

const Products = () => {
    const location = useLocation();
    const { auth, isAdmin } = useAuth();
    const [loading, setLoading] = useState(true);

    const [price, setPrice] = useState([0, 200000]);
    const [category, setCategory] = useState(
        location.search ? location.search.split("=")[1] : ""
    );
    const [ratings, setRatings] = useState(0);
    const [products, setProducts] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [productsCount, setProductsCount] = useState(0);
    const productsPerPage = 8;
    const totalPages = Math.ceil(productsCount / productsPerPage);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const fetchFilteredData = async () => {
            try {
                setLoading(true);

                const params = {
                    category: category,
                    priceRange: [price[0], price[1]],
                    ratings: ratings,
                };
                
                // Log the parameters being sent to the server for debugging
                console.log("Frontend sending params:", params);

                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/product/filtered-products`,
                    { params }
                );

                // Set products from the response
                setProducts(res.data.products);
                setProductsCount(res.data.products.length);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);

                if (error.response?.status === 404) {
                    toast.error("No Products Found!", { toastId: "productNotFound" });
                    setProducts([]); // Clear products to show "no products found"
                    setProductsCount(0);
                } else {
                    toast.error("Something went wrong! Please try after sometime.", {
                        toastId: "error",
                    });
                }
            }
        };
        fetchFilteredData();
    }, [price, category, ratings]);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/wishlist`,
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    }
                );
                setWishlistItems(res.data.wishlistItems);
            } catch (error) {
                console.error("Error fetching data from wishlist:", error);
                toast.error("Error in Fetching Wishlist Items!", {
                    toastId: "error",
                });
            }
        };
        auth?.token && !isAdmin && fetchWishlistItems();
    }, [auth?.token, isAdmin]);

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    return (
        <>
            <SeoData title="All Products | FurryPaws" />
            <main className="w-full pt-2 pb-5 sm:mt-0">
                <div className="flex gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto">
                    <SideFilter
                        price={price}
                        category={category}
                        ratings={ratings}
                        setPrice={setPrice}
                        setCategory={setCategory}
                        setRatings={setRatings}
                    />

                    <div className="flex-1 relative">
                        {loading ? (
                            <Spinner />
                        ) : (
                            <>
                                {products?.length === 0 ? (
                                    <div className="flex flex-col items-center justify-start gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16 sm:min-h-[750px] ">
                                        <img
                                            draggable="true"
                                            className="w-1/2 h-44 object-contain"
                                            src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png"
                                            alt="Search Not Found"
                                        />
                                        <h1 className="text-2xl font-medium text-gray-900">
                                            Sorry, no results found!
                                        </h1>
                                        <p className="text-xl text-center text-primary-grey">
                                            Please check the spelling or try searching for something else.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">
                                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-4 w-full place-content-start overflow-hidden pb-4 min-h-[750px]">
                                            {currentProducts?.map((product) => (
                                                <Product
                                                    key={product._id}
                                                    {...product}
                                                    wishlistItems={wishlistItems}
                                                    setWishlistItems={setWishlistItems}
                                                />
                                            ))}
                                        </div>
                                        {productsCount > productsPerPage && (
                                            <Pagination
                                                count={totalPages}
                                                page={currentPage}
                                                onChange={handlePageChange}
                                                color="primary"
                                            />
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Products;