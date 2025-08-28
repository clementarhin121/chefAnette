import { useEffect, useState } from "react";
import Menu from "../components/menu";
import { useNavigate } from "react-router-dom";

function Products() {
  useEffect(() => {
    fetch("/products.json") // React will serve it from public folder
      .then((res) => res.json())
      .then((data) => setProds(data))
      .catch((err) => console.error("fetch error:", err));
  }, []);

  const nav = useNavigate();

  const About = (id) => {
    nav(`/${id}`);
  };

  const list = prods.map((d) => (
    <ul onClick={() => About(d.product_id)}>
      <li key={d.product_id}>
        <h1>{d.product_name}</h1>
        <img
          src={d.product_image}
          alt=""
        />
        <p>{d.product_description}</p>
        <p>${d.product_price}</p>
      </li>
    </ul>
  ));

  return (
    <>
      <div className="productpage">
        <div className="overlay">
          <Menu />
          <div className="listItems">
            <div className="listSlide">{list}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Products;
