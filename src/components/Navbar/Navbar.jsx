import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import caret_icon from "../../assets/caret_icon.svg";
import { logout, auth } from "../../firebase"; // firebase auth sadece logout için
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(
    localStorage.getItem("profilePhoto") || "/default-avatar.png"
  );
  const [open, setOpen] = useState(false);

  // Scroll efekti
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) navRef.current.classList.add("nav-dark");
      else navRef.current.classList.remove("nav-dark");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // LocalStorage üzerinden foto değişimlerini takip et
  useEffect(() => {
    const handleStorageChange = () => {
      const storedPhoto = localStorage.getItem("profilePhoto");
      if (storedPhoto) setPhoto(storedPhoto);
    };

    window.addEventListener("storage", handleStorageChange);

    // Component mount anında da kontrol et
    handleStorageChange();

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img src={search_icon} alt="" className="icons" />
        <img src={bell_icon} alt="" className="icons" />

        <div className="navbar-profile" onClick={() => setOpen(!open)}>
          <img
            src={photo}
            alt="profile"
            className="navbar-profile-img"
          />
          <img src={caret_icon} alt="" />

          {open && (
            <div className="dropdown">
              <p
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
              >
                Profili Güncelle
              </p>
              <p
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Sign Out of Netflix
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
