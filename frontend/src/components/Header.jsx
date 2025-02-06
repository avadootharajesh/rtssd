import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuopen, setMenuopen] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const pathnameRef = useRef(location.pathname);


  const user = JSON.parse(localStorage.getItem("user"));
  const sitelogo = require("../assets/images/logo.jpg");

  const registerfunction = () => {
    navigate("/register");
  };

  const loginfunction = () => {
    navigate("/login");
  };

  const logoclick = () => {
    if (user) navigate("/dashboard");
    else navigate("/");
  };

  const toggleDropdown = () => {
    setMenuopen(!menuopen);
  };

  const logout = () => {
    localStorage.removeItem("user");
    // refresh the page
    window.location.reload();
    navigate("/login");
  };

  const pathname = () => {
    if (location.pathname === "/") return "Home";
    var path = location.pathname;
    return path;
  };

  useEffect(() => {
    if (pathnameRef.current !== location.pathname) {
      setAnimationTrigger(true);
      pathnameRef.current = location.pathname;
      const timer = setTimeout(() => {
        setAnimationTrigger(false);
      }, 500); // Match duration in CSS animation
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className="header">
      <div className="headermainline">
        <div className="headerlogo" onClick={logoclick}>
          <img src={sitelogo} alt="Hello" className="headerlogo" />
        </div>
        <div className="headerright">
          {user ? (
            <>
              {user.isAdmin ? (
                <>
                  <div className="headerrightlink">
                    <Link to="/adminpanel">Admin Panel</Link>
                  </div>
                  <div className="headerrightlink">
                    <Link to="/userrequests">Requests</Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="headerrightlink tools" style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}>
                    <Link to={"/profile"} className="profile-link">Profile</Link>
                    <Link onClick={logout} className="profile-link">Logout</Link>
                    <div className="dropdown" style={{
                      border: "none"
                    }}>
                      <div className="dropdown-btn" onClick={toggleDropdown}>
                        Tools
                        <div
                          className={`triangle ${menuopen ? "rotate" : ""}`}
                        />
                      </div>
                      <div
                        className={`dropdown-content ${menuopen ? "show" : ""}`}
                      >
                        <Link to="/about">About</Link>
                        <Link to="/request">Request data</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/change-password">Change password</Link>
                        <Link to="/delete-account">Delete Account</Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="headerrightlinks" style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <div className="headerrightlink-button" >
                <Link to="/about" className="headerrightlink" style={{textDecoration: "none", color: "black", }}>
                  About
                </Link>
              </div>
              <div className="headerrightlink-button">
                <Link to="/contact" className="headerrightlink">
                  Contact
                </Link>
              </div>
              <p className="dividerline" style={{ userSelect: "none" }}>
                |
              </p>
              <div className=" headerrightlink-button">
                <button onClick={registerfunction} className="headerrightlink">
                  Register
                </button>
              </div>
              <div className="headerrightlink-button">
                <button onClick={loginfunction} className="headerrightlink">
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        style={{ userSelect: "none" }}
        className={`pagenamedisplay ${animationTrigger ? "animate" : ""}`}
      >
        <h1 className="pagename">{pathname()}</h1>
      </div>
    </div>
  );
}
