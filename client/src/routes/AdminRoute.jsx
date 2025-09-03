import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/auth";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const {auth} = useAuth();  // ✅ only 2 values
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authCheck = async () => {
      if (!auth?.token) {
        navigate("/login", { state: location.pathname });
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/admin-auth`,
          {
            headers: { Authorization: `Bearer ${auth?.token}` },

          }
        );

        if (res.data?.ok) {
          setOk(true);
        } else {
          setOk(false);
          navigate("/login", { state: location.pathname });
        }
      } catch (error) {
        console.error("Admin check failed:", error);

        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          toast.error("Admin Privileges Required!", {
            toastId: "userNotAdmin",
          });
          navigate("/login", { state: location.pathname });
        }
      } finally {
        setLoading(false);
      }
    };

    authCheck();
  }, [auth?.token, location.pathname, navigate]);

  if (loading) {
    return <Spinner />;
  }

  return ok ? <Outlet /> : null;
};

export default AdminRoute;
