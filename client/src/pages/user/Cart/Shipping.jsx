import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import states from "../../../utils/states";
import { toast } from "react-toastify";
import { useCart } from "../../../context/cart";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import SeoData from "../../../SEO/SeoData";
import PriceCard from "./PriceCard";
import Spinner from "../../../components/Spinner"; // Make sure to import your Spinner component

const Shipping = () => {
    const Info = localStorage.getItem("shippingInfo");
    const shippingInfo = JSON.parse(Info);

    const [cartItems] = useCart();
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false); // New loading state

    const [address, setAddress] = useState(shippingInfo?.address || "");
    const [city, setCity] = useState(shippingInfo?.city || "");
    const [country, setCountry] = useState("IN");
    const [state, setState] = useState(shippingInfo?.state || "");
    const [landmark, setLandmark] = useState(shippingInfo?.landmark || "");
    const [pincode, setPincode] = useState(shippingInfo?.pincode || "");
    const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "");

    const publishKey = import.meta.env.VITE_STRIPE_PUBLISH_KEY;
    let frontendURL = window.location.origin;

    // A unified function to handle both validation and payment
    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Client-side validation
        if (phoneNo.length < 10 || phoneNo.length > 10) {
            toast.error("Invalid Mobile Number");
            setLoading(false);
            return;
        }
        if (!address || !city || !state || !pincode || !phoneNo) {
            toast.error("Please fill in all required shipping details.");
            setLoading(false);
            return;
        }

        // Save shipping info to localStorage
        const data = {
            address: address,
            city: city,
            country: country,
            state: state,
            landmark: landmark,
            pincode: pincode,
            phoneNo: phoneNo,
        };
        localStorage.setItem("shippingInfo", JSON.stringify(data));

        try {
            const stripe = await loadStripe(publishKey);

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/create-checkout-session`,
                {
                    products: cartItems,
                    frontendURL: frontendURL,
                    customerEmail: auth?.user?.email,
                },
                {
                    headers: {
                         Authorization: `Bearer ${auth?.token}`,
                    },
                }
            );

            const session = response.data.session;
            localStorage.setItem("sessionId", session.id);

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error("Stripe redirection error:", result.error);
                toast.error("An error occurred during payment.");
            }
        } catch (error) {
            console.error("Payment session creation failed:", error);
            toast.error("Failed to create a payment session. Please try again.");
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            }
        } finally {
            setLoading(false); // Always stop loading, whether success or fail
        }
    };

    return (
        <>
            <SeoData title="Flipkart: Shipping Details" />
            <main className="w-full pt-8">
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mx-0 px-2 sm:mx-8 mt-4 overflow-hidden">
                    <div className="flex-1">
                        <div className="w-full px-4 sm:px-0 bg-white py-5">
                            <form
                                onSubmit={handlePayment} // ✅ Only one submit handler now
                                autoComplete="off"
                                className="flex flex-col justify-start gap-3 w-full sm:w-3/4 mx-1 sm:mx-8 my-4"
                            >
                                <TextField
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    fullWidth
                                    label="Address"
                                    variant="outlined"
                                    required
                                />

                                <div className="flex gap-6">
                                    <TextField
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        type="number"
                                        label="Pincode"
                                        fullWidth
                                        variant="outlined"
                                        required
                                    />
                                    <TextField
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        type="number"
                                        label="Phone No"
                                        fullWidth
                                        variant="outlined"
                                        required
                                    />
                                </div>

                                <div className="flex gap-6">
                                    <TextField
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        label="City"
                                        fullWidth
                                        variant="outlined"
                                        required
                                    />
                                    <TextField
                                        label="Landmark (Optional)"
                                        value={landmark}
                                        onChange={(e) => setLandmark(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>

                                <div className="flex gap-6">
                                    <FormControl fullWidth>
                                        <InputLabel id="country-select">Country</InputLabel>
                                        <Select
                                            labelId="country-select"
                                            id="country-select"
                                            defaultValue={country}
                                            disabled
                                            label="Country"
                                        >
                                            <MenuItem value={"IN"}>India</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth disabled={country ? false : true}>
                                        <InputLabel id="state-select">State</InputLabel>
                                        <Select
                                            labelId="state-select"
                                            id="state-select"
                                            value={state}
                                            label="State"
                                            onChange={(e) => setState(e.target.value)}
                                            required
                                        >
                                            {states?.map((item) => (
                                                <MenuItem key={item.code} value={item.code}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>

                                <button
                                    type="submit" // ✅ Now the form submission triggers the handlePayment function
                                    disabled={loading}
                                    className={`bg-orange w-full sm:w-[40%] mt-4 py-3.5 px-2 text-md font-[500] text-white shadow hover:shadow-lg rounded-sm uppercase outline-none ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                                >
                                    {loading ? 'Processing...' : 'make payment'}
                                </button>
                                {loading && <Spinner />}
                            </form>
                        </div>
                    </div>
                    <PriceCard cartItems={cartItems} />
                </div>
            </main>
        </>
    );
};

export default Shipping;