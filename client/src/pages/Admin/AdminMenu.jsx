import { NavLink } from "react-router-dom";
import { FaUser, FaShoppingBag, FaBoxOpen, FaPlus, FaUsers } from "react-icons/fa";

const AdminMenu = () => {
  const menuItems = [
    { name: "Profile", to: "profile", icon: <FaUser /> },
    { name: "Orders", to: "/admin/orders", icon: <FaShoppingBag /> },
    { name: "Products", to: "all-products", icon: <FaBoxOpen /> },
    { name: "Add Product", to: "add-product", icon: <FaPlus /> },
    { name: "Users", to: "users", icon: <FaUsers /> },
  ];

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md w-64">
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-300 
            ${
              isActive
                ? "bg-[#88e0d8] text-white font-semibold shadow"
                : "hover:bg-[#f1f3f5] hover:text-[black] text-gray-700"
            }`
          }
        >
          <div className="text-lg">{item.icon}</div>
          <span className="text-sm sm:text-base">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default AdminMenu;
