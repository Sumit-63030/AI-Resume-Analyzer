import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <img
          src="/favicon.png"
          alt="AI Resume Analyzer"
          className="navbar__logo"
        />

        <div>
          <h2>AI Resume Analyzer</h2>
          <span>Smart ATS Resume Review</span>
        </div>
      </div>

      <button
        className="navbar__logout"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        Logout
      </button>
    </nav>
  );
};

export default Navbar;