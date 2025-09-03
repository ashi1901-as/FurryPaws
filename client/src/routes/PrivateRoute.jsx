/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const { auth, isContextLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authCheck = async () => {
      try {
        console.log("🔑 Auth token from context:", auth?.token);

        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/user-auth`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`, // ✅ use context token
            },
          }
        );

        res.data.ok ? setOk(true) : setOk(false);
      } catch (error) {
        console.error("Auth error:", error);

        if (error.response?.status === 401 && !isContextLoading) {
          setTimeout(() => {
            toast.error("Please Log in to access Details!", {
              toastId: "userNotLoggedIn",
            });
            navigate("/login", {
              state: location.pathname,
            });
          }, 500);
        }
      }
    };

    if (!isContextLoading) {
      authCheck();
    }
  }, [auth?.token, isContextLoading, location.pathname, navigate]);

  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
