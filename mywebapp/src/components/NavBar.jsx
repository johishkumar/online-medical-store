import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const navLinkStyle = {
    color: "#0B5345",
    fontWeight: "500",
    fontFamily: "Poppins, sans-serif",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    transition: "color 0.3s ease",
  };

  const navLinkHoverStyle = {
    color: "#1ABC9C",
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#f8f9fa",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        padding: "0.75rem 1rem",
        borderBottom: "3px solid #1ABC9C",
      }}
    >
      <div className="container">
        {/* Brand Logo */}
        <Link
          className="navbar-brand"
          to="/"
          style={{
            color: "#1ABC9C",
            fontWeight: "bold",
            fontFamily: "Poppins, sans-serif",
            fontSize: "1.4rem",
            textDecoration: "none",
          }}
        >
          ONLINE MEDICAL STORE
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav" style={{textAlign:"right"}}>
          <ul className="navbar-nav ms-auto">
            {[
              { to: "/order", label: "Medicine" },
              { to: "/labtest", label: "Lab Test" },
              { to: "/health", label: "Health Products" },
              { to: "/covid", label: "COVID Care" },
              { to: "/diabetes", label: "Diabetes Care" },
              { to: "/form", label: "Form" },
              { to: "/display", label: "Order" },
              { to: "/about", label: "About Us" },
            ].map((item, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className="nav-link"
                  to={item.to}
                  style={navLinkStyle}
                  onMouseOver={(e) =>
                    (e.target.style.color = navLinkHoverStyle.color)
                  }
                  onMouseOut={(e) =>
                    (e.target.style.color = navLinkStyle.color)
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
