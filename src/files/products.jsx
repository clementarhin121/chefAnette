import { useEffect, useState } from "react";
import Menu from "../components/menu";
import { useNavigate } from "react-router-dom";

function Products() {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProds(data))
      .catch((err) => console.error("fetch error:", err));
  }, []);

  const nav = useNavigate();

  const About = (id) => {
    nav(`/${id}`);
  };

  const list = prods.map((d) => (
    <ul
      key={d.product_id}
      onClick={() => About(d.product_id)}>
      <li>
        <h1>{d.product_name}</h1>
        <p>
          <strong>Location:</strong> {d.location}
        </p>
        <img
          src={d.product_image}
          alt={d.product_name}
        />
        <p>{d.product_description}</p>
        <p>
          <strong>Price:</strong> ${d.product_price}
        </p>
        <p>
          <strong>Quantity:</strong> {d.quantity}
        </p>
      </li>
    </ul>
  ));

  return (
    <div className="productpage">
      <div className="overlay">
        <Menu />
        <div className="listItems">
          <div className="listSlide">{list}</div>
        </div>
      </div>
    </div>
  );
}

export default Products;
