import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const { auth } = useAuth() || {};
console.log("🔒 PrivateRoute auth:", auth);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/user-auth`,
                    {
                        headers: {
                            Authorization: `Bearer ${auth?.token}`,
                        },
                    }
                );
                res.data.ok ? setOk(true) : setOk(false);
            } catch (error) {
                console.error("Auth error:", error);
                setOk(false);
                // Optional: You can show a toast here to inform the user
                if (error.response?.status === 401) {
                    toast.error("Please log in to continue.", { toastId: "notLoggedIn" });
                    navigate("/login", { state: location.pathname });
                }
            }
        };

        // This is the key: The effect only runs if a token is present.
        // It will re-run when the token changes from null to a valid token.
        if (auth?.token) {
            authCheck();
        } else {
            setOk(false); // Make sure to set to false if no token
        }
    }, [auth?.token, navigate, location.pathname]);
   console.log("🔑 PrivateRoute auth.token:", auth?.token, "ok:", ok);

    // Renders a spinner while the check is happening, preventing a flicker.
    return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;