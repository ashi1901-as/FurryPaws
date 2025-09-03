import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      {/* Profile (inside AdminDashboard) */}
      <NavLink
        to="profile"
        onClick={scrollToTop}
        className={({ isActive }) =>
          isActive
            ? "font-[600] text-primaryBlue bg-[#f1f3f5]"
            : ""
        }
      >
        <div className="h-[40px] px-[60px] flex items-center hover:text-primaryBlue hover:bg-[#f1f3f5]">
          Profile
        </div>
      </NavLink>

      {/* Orders (separate route: /admin/orders) */}
      <NavLink
        to="/admin/orders"
        onClick={scrollToTop}
        className={({ isActive }) =>
          isActive
            ? "font-[600] text-primaryBlue bg-[#f1f3f5]"
            : ""
        }
      >
        <div className="h-[40px] px-[60px] flex items-center hover:text-primaryBlue hover:bg-[#f1f3f5]">
          Orders
        </div>
      </NavLink>

      {/* Products (inside AdminDashboard) */}
      <NavLink
        to="all-products"
        onClick={scrollToTop}
        className={({ isActive }) =>
          isActive
            ? "font-[600] text-primaryBlue bg-[#f1f3f5]"
            : ""
        }
      >
        <div className="h-[40px] px-[60px] flex items-center hover:text-primaryBlue hover:bg-[#f1f3f5]">
          Products
        </div>
      </NavLink>

      {/* Add Product (inside AdminDashboard) */}
      <NavLink
        to="add-product"
        onClick={scrollToTop}
        className={({ isActive }) =>
          isActive
            ? "font-[600] text-primaryBlue bg-[#f1f3f5]"
            : ""
        }
      >
        <div className="h-[40px] px-[60px] flex items-center hover:text-primaryBlue hover:bg-[#f1f3f5]">
          Add Product
        </div>
      </NavLink>

      {/* Users (inside AdminDashboard) */}
      <NavLink
        to="users"
        onClick={scrollToTop}
        className={({ isActive }) =>
          isActive
            ? "font-[600] text-primaryBlue bg-[#f1f3f5]"
            : ""
        }
      >
        <div className="h-[40px] px-[60px] flex items-center hover:text-primaryBlue hover:bg-[#f1f3f5]">
          Users
        </div>
      </NavLink>
    </div>
  );
};

export default AdminMenu;
