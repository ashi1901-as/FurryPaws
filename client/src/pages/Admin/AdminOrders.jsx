import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import SearchIcon from "@mui/icons-material/Search";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useAuth } from "../../context/auth";
import SeoData from "../../SEO/SeoData";

const AdminOrders = () => {
    const { auth } = useAuth();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!auth?.token) {
            console.log("❌ No auth token found");
            setError("You are not authorized. Please log in.");
            return;
        }

        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/admin-orders`,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    }
                );

                setOrders(response.data.orders || []);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching orders:", err.response || err);
                setLoading(false);

                if (err.response?.status === 401) {
                    setError("Unauthorized. Please log in again.");
                } else {
                    setError("Failed to fetch orders. Try again later.");
                }
            }
        };

        fetchOrders();
    }, [auth?.token]);

    return (
        <>
            <SeoData title="Admin Orders | FurryPaws" />

            <main className="w-full px-4 sm:px-10 py-4">
                <div className="flex gap-3.5 w-full">
                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <div className="flex items-center justify-center p-10 bg-white rounded">
                            <p className="text-red-600 font-medium">{error}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 w-full pb-5 overflow-hidden">
                            {/* Search bar */}
                            <form className="flex items-center justify-between mx-auto w-[100%] sm:w-10/12 bg-white border rounded mb-2 hover:shadow-md">
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="search"
                                    name="search"
                                    placeholder="Search your orders here"
                                    className="p-2 text-sm outline-none flex-1 rounded-l"
                                />
                                <button
                                    type="submit"
                                    className="h-full text-sm px-1 sm:px-4 py-2.5 text-white bg-primaryBlue hover:bg-blue-600 rounded-r flex items-center gap-1"
                                >
                                    <SearchIcon sx={{ fontSize: "20px" }} />
                                    <p className="text-[10px] sm:text-[14px]">Search</p>
                                </button>
                            </form>

                            {/* Orders */}
                            {orders?.length === 0 ? (
                                <div className="flex items-center flex-col gap-2 p-10 bg-white rounded-sm">
                                    <img
                                        draggable="false"
                                        src="https://rukminim1.flixcart.com/www/100/100/promos/23/08/2020/c5f14d2a-2431-4a36-b6cb-8b5b5e283d4f.png"
                                        alt="Empty Orders"
                                    />
                                    <span className="text-lg font-medium">
                                        Sorry, no orders found
                                    </span>
                                    <p>Get some orders first</p>
                                </div>
                            ) : (
                                orders
                                    .slice()
                                    .reverse()
                                    .map((order) =>
                                        order.products.map((item, index) => (
                                            <OrderItem
                                                key={index}
                                                item={item}
                                                orderId={order._id}
                                                orderStatus={order.orderStatus}
                                                createdAt={order.createdAt}
                                                paymentId={order.paymentId}
                                                buyer={order.buyer}
                                                shippingInfo={order.shippingInfo}
                                                amount={order.amount}
                                            />
                                        ))
                                    )
                            )}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default AdminOrders;
