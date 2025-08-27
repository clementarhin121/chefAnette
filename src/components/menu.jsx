import { useState } from "react";

function Menu() {
  const [sinotabClass, setSinotabClass] = useState("sinotab");
  const toggleClass = () => {
    setSinotabClass((prev) =>
      prev.includes("activate") ? "sinotab" : "sinotab activate"
    );
  };

  return (
    <>
      <div className="menuHome">
        <div className="logo">
          <a href="/">
            <h2>Chefs</h2>
          </a>
          <div
            className="sino"
            onClick={toggleClass}>
            <i className="fa-regular fa-user"></i>
          </div>{" "}
          <div className={sinotabClass}>
            <a href="/signup">
              {" "}
              <p>Sign up</p>
            </a>
            <p>/</p>
            <a href="/signin">
              <p>Sign in</p>
            </a>
          </div>
        </div>
        <div className="user">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <div className="burger">
          <div className="lanes">
            <div className="lane1"></div>
            <div className="lane2"></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Menu;
