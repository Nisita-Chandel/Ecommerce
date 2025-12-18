import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <header className="flex justify-between items-center px-6 py-3 shadow">
      {/* LEFT */}
      <h1 className="text-2xl font-bold text-red-600">H&M</h1>

      {/* CENTER */}
      <nav className="space-x-6">
        <Link to="/">Home</Link>
        <Link to="/ladies">Ladies</Link>
        <Link to="/men">Men</Link>
        <Link to="/kids">Kids</Link>
        <Link to="/beauty">Beauty</Link>
      </nav>

      {/* RIGHT */}
      <div className="space-x-4">
        {!token ? (
          <Link to="/admin/login" className="font-semibold">
            Admin
          </Link>
        ) : (
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="font-semibold"
          >
            Admin Dashboard
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
