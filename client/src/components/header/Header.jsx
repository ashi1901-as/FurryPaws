import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { BsCart2, BsBox } from "react-icons/bs";
import { BiHomeSmile } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import {GrArticle} from "react-icons/gr";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

const { auth, setAuth } = useAuth();


  const [cartItems] = useCart();

  let closeTimeout;
  const toggleDropdown = () => {
    clearTimeout(closeTimeout);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    closeTimeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  const handleLogout = () => {
  setAuth({ user: null, token: "" });
  localStorage.removeItem("auth");
};


  const handleStickyHeader = () => {
    if (window.scrollY > 0) {
      headerRef.current.classList.add(
        "shadow-md",
        "bg-white/90",
        "backdrop-blur"
      );
    } else {
      headerRef.current.classList.remove(
        "shadow-md",
        "bg-white/90",
        "backdrop-blur"
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyHeader);
    return () => {
      window.removeEventListener("scroll", handleStickyHeader);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 transition-all duration-300"
    >
      <nav className="w-full bg-[#2e2f2f] px-10 py-3 flex items-center justify-between rounded-none">
        
        {/* Logo */}
        <Link to="/" className="flex items-center ml-4">
          <img src={logo} alt="logo" className="h-8 object-contain" />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-500 text-2xl mr-0">
          {/*<NavLink to="/" className="hover:text-[#62d3f3] transition-colors">
            <BiHomeSmile />
          </NavLink>*/}

          {auth.user?.role !== 1 && auth.user && (
            <NavLink
              to="/user/wishlist"
              className="hover:text-[#62d3f3] transition-colors"
            >
              <AiOutlineHeart />
            </NavLink>
          )}


           {auth?.user?.role !== 1 && (
            <NavLink
              to="/cart"
              className="relative hover:text-[#62d3f3] transition-colors"
            >
              <BsCart2 />
              {cartItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-[#62d3f3] text-white rounded-full px-1">
                  {cartItems.length}
                </span>
              )}
            </NavLink>
          )}
          
          {auth.user && (
            <NavLink
              to={`${auth.user.role === 1 ? "/admin" : "/user"}/orders`}
              className="hover:text-[#62d3f3] transition-colors"
            >
              <BsBox />
            </NavLink>
          )}
          {/* 
          {auth.user?.role !== 1 && auth.user && (
            <NavLink
              to="/educational-articles"
              className="hover:text-[#62d3f3] transition-colors"
            >
              <GrArticle/>
            </NavLink>
          )}
            */}

          {/* Account Dropdown */}
          <div
            className="relative"
            onMouseEnter={toggleDropdown}
            onMouseLeave={closeDropdown}
          >
            {auth.user ? (
              <button className="flex items-center hover:text-[#62d3f3]">
                <AiOutlineUser />
                <RiArrowDropDownLine />
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center hover:text-[#62d3f3]"
              >
                <AiOutlineUser />
              </Link>
            )}

            {isDropdownOpen && (
              <div className="absolute top-10 right-0 bg-white border rounded-md shadow p-2 w-36">
                <ul className="space-y-1 text-sm">
                  {!auth.user && (
                    <li>
                      <Link
                        to="/register"
                        className="block px-2 py-1 hover:bg-gray-100 rounded"
                      >
                        Sign up
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to={`${
                        auth?.user?.role === 1 ? "/admin" : "/user"
                      }/dashboard`}
                      className="block px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      My Profile
                    </Link>
                  </li>
                  {auth.user && (
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                      >
                        <MdLogout className="inline-block mr-1" /> Logout
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

         
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="flex flex-col items-center gap-4 mt-2 pb-4 md:hidden text-gray-500 text-2xl bg-white shadow-inner">
          <NavLink to="/" className="hover:text-[#62d3f3] transition-colors" onClick={() => setMenuOpen(false)}>
            <BiHomeSmile />
          </NavLink>

          {auth.user?.role !== 1 && auth.user && (
            <NavLink
              to="/user/wishlist"
              className="hover:text-[#62d3f3] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <AiOutlineHeart />
            </NavLink>
          )}

          {auth.user && (
            <NavLink
              to={`${auth.user.role === 1 ? "/admin" : "/user"}/orders`}
              className="hover:text-[#62d3f3] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <BsBox />
            </NavLink>
          )}

          {/* Account */}
          {auth.user ? (
            <Link
              to={`${
                auth?.user?.role === 1 ? "/admin" : "/user"
              }/dashboard`}
              className="hover:text-[#62d3f3]"
              onClick={() => setMenuOpen(false)}
            >
              <AiOutlineUser />
            </Link>
          ) : (
            <Link
              to="/login"
              className="hover:text-[#62d3f3]"
              onClick={() => setMenuOpen(false)}
            >
              <AiOutlineUser />
            </Link>
          )}

          {auth?.user?.role !== 1 && (
            <NavLink
              to="/cart"
              className="relative hover:text-[#62d3f3] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <BsCart2 />
              {cartItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-[#62d3f3] text-white rounded-full px-1">
                  {cartItems.length}
                </span>
              )}
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
