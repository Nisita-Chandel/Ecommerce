import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  const cartItems = useSelector((state) => state.cart.items);
  const favoriteItems = useSelector((state) => state.favorites.items);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.qty || 1),
    0
  );

  const favoriteCount = favoriteItems.length;

  const linkBase =
    "pb-1 text-sm md:text-base font-medium tracking-wide border-b-2 border-transparent transition-all duration-200";
  const inactive = "text-gray-400 hover:text-black hover:border-black";
  const active = "text-black border-black";

  return (
    <header className="mt-4 sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto px-2 py-2 flex items-center gap-8">

        <Link to="/" className="flex items-center shrink-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg"
            alt="H&M Logo"
            className="w-24 h-auto"
          />
        </Link>

        <div className="flex items-center gap-6">
          <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>Home</NavLink>
          <NavLink to="/ladies" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>Ladies</NavLink>
          <NavLink to="/men" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>Men</NavLink>
          <NavLink to="/kids" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>Kids</NavLink>
          <NavLink to="/beauty" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>Beauty</NavLink>
        </div>

        <div className="ml-auto flex items-center gap-5">

          <Link to="/search">
            <Search size={22} />
          </Link>

          <Link to="/favorite" className="relative">
            <Heart
              size={22}
              className={favoriteCount > 0 ? "text-red-500 fill-red-500" : ""}
            />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full px-1">
                {favoriteCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <button onClick={logout}>
              <User size={22} />
            </button>
          ) : (
            <Link to="/login">
              <User size={22} />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
