import { useEffect, useState,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useCart } from "../../../context/cart";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import Spinner from "./../../../components/Spinner";
import SeoData from "../../../SEO/SeoData";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useCart();
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [redirectCountdown, setRedirectCountdown] = useState(3);
  const called = useRef(false);

  useEffect(() => {
       if (called.current) return; // prevent multiple calls
    called.current = true;
    const handleSuccessfulPayment = async () => {
      console.log("🚀 [OrderSuccess] Mounted");
      const sessionId = localStorage.getItem("sessionId");
      console.log("📦 Local sessionId:", sessionId);
      console.log("🛒 Cart Items:", cartItems);
      console.log("🔑 Auth at start:", auth);

      if (!sessionId || cartItems.length === 0) {
        console.warn("⚠️ Missing sessionId or empty cart. Stopping.");
        setLoading(false);
        return;
      }

      try {
        // Ensure token exists
        if (!auth?.token) {
          console.warn("⚠️ No auth.token in context, trying localStorage");
          const savedAuth = localStorage.getItem("auth");
          if (savedAuth) {
            const parsed = JSON.parse(savedAuth);
            console.log("🔄 Rehydrated auth from localStorage:", parsed);
            setAuth(parsed);
            if (!parsed?.token) {
              console.error("❌ Still no token after rehydration, stopping.");
              setLoading(false);
              return;
            }
          } else {
            console.error("❌ No auth found in localStorage either. Stopping.");
            setLoading(false);
            return;
          }
        }

        console.log("🌐 Sending request to payment-success endpoint...");
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/user/payment-success`,
          {
            sessionId,
            orderItems: cartItems,
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token || JSON.parse(localStorage.getItem("auth"))?.token}`,
            },
          }
        );

        console.log("✅ Payment success API response:", response);

        if (response.status === 200) {
          console.log("🎉 Payment saved successfully. Clearing cart + session.");
          localStorage.removeItem("cart");
          localStorage.removeItem("sessionId");
          setCartItems([]);
          setLoading(false);

          // Start countdown
          const timer = setInterval(() => {
            setRedirectCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                console.log("➡️ Redirecting to /user/orders");
                navigate("/user/orders");
                return 0;
              }
              console.log(`⏳ Countdown: ${prev - 1}s left`);
              return prev - 1;
            });
          }, 1000);

          return () => clearInterval(timer);
        } else {
          console.error("❌ Non-200 response from backend:", response);
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ Error in payment-success request:", error);
        if (error.response) {
          console.error("📡 Error response data:", error.response.data);
          console.error("📡 Error response status:", error.response.status);
          console.error("📡 Error response headers:", error.response.headers);
        }
        setLoading(false);
      }
    };

    handleSuccessfulPayment();
  }, [auth?.token, cartItems, navigate, setCartItems, setAuth]);

  return (
    <>
      <SeoData title={`Transaction Successful`} />
      <main className="w-full p-8 relative min-h-[60vh]">
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center sm:w-4/6 m-auto bg-white shadow rounded p-6 min-h-[60vh]">
            <div className="flex gap-4 items-center">
              <h1 className="text-2xl font-semibold">Transaction Successful</h1>
              <CheckCircleOutlineIcon className="text-primaryBlue" />
            </div>
            <p className="mt-4 text-lg text-gray-800">
              Redirecting to orders in {redirectCountdown} sec
            </p>
            <Link
              to="/user/orders"
              className="bg-primaryBlue mt-2 py-2.5 px-6 text-white uppercase shadow hover:shadow-lg rounded-sm"
            >
              go to orders
            </Link>
          </div>
        )}
      </main>
    </>
  );
};

export default OrderSuccess;
