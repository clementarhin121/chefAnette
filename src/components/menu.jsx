import { useState, useEffect, useRef } from "react";

function Menu() {
  const [sinotabClass, setSinotabClass] = useState("sinotab");
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const burgerRef = useRef(null);

  const toggleClass = () => {
    setSinotabClass((prev) =>
      prev.includes("activate") ? "sinotab" : "sinotab activate"
    );
  };

  const toggleBurger = () => {
    setIsBurgerOpen((prev) => !prev);
  };

  // Close burger dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (burgerRef.current && !burgerRef.current.contains(event.target)) {
        setIsBurgerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="menuHome">
      <div className="logo">
        <a href="/">
          <h2>Chefs</h2>
        </a>
        <div
          className="sino"
          onClick={toggleClass}>
          <i className="fa-regular fa-user"></i>
        </div>
        <div className={sinotabClass}>
          <a href="/signup">
            <p>Sign up</p>
          </a>
          <p>/</p>
          <a href="/signin">
            <p>Sign in</p>
          </a>
        </div>
      </div>

      <div className="user">
        <i className="fa-solid fa-cart-shopping"></i>
      </div>

      {/* Burger and dropdown wrapper */}
      <div
        className="burgerWrapper"
        ref={burgerRef}>
        <div
          className="burger"
          onClick={toggleBurger}>
          <div className="lanes">
            <div className="lane1"></div>
            <div className="lane2"></div>
          </div>
        </div>

        {isBurgerOpen && (
          <div className="burgerDropdown">
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
