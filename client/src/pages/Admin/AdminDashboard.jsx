import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import AdminMenu from "./AdminMenu";
import UserProfile from "../UserProfile";
import AddressComponent from "../AddressComponent";
import PanCardComponent from "../PanCardComponent";
import CreateProduct from "./CreateProduct";
import AllProducts from "./AllProducts";
import Users from "./Users";
import Deactivate from "../Auth/Deactivate";
import EditProduct from "./EditProduct";
import SeoData from "../../SEO/SeoData";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (window.location.pathname === "/admin/dashboard") {
            navigate("./profile");
        }
    }, [navigate]);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    return (
        <>
            <SeoData title="Admin Dashboard" />
<div className="h-full py-4 sm:py-10 px-2 sm:px-12 ">
  <div className="flex flex-col sm:flex-row gap-6 h-full ">
    {/* Sidebar */}
    <div
      className={`sm:w-6/5 ${
        isMenuOpen ? "fixed inset-0 z-50 bg-white p-6 shadow-lg" : "hidden sm:block"
      } rounded-lg `}
    >
      <AdminMenu toggleMenu={toggleMenu} />
    </div>

    {/* Main Content */}
    <div className="sm:w-2/3 w-full bg-gray-50 rounded-xl p-6 shadow-lg flex flex-col gap-4 ">
      {/* Hamburger for mobile */}
      <div className="sm:hidden mb-4">
        <button
          onClick={toggleMenu}
          className="text-blue-600 flex items-center gap-2 text-lg font-semibold"
        >
          {isMenuOpen ? "Close" : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Routes */}
      <div className="flex-1 flex flex-col gap-6 ">
        <Routes>
          <Route path="" element={<UserProfile />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="address" element={<AddressComponent />} />
          <Route path="pan" element={<PanCardComponent />} />
          <Route path="add-product" element={<CreateProduct />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="users" element={<Users />} />
          <Route path="profile/deactivate" element={<Deactivate />} />
          <Route path="product/:productId" element={<EditProduct />} />
        </Routes>
      </div>
    </div>
  </div>
</div>

        </>
    );
};

export default AdminDashboard;
