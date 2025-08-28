import { useEffect, useState } from "react";
import Menu from "../components/menu";
import { useParams } from "react-router-dom";

function AboutP() {
  const { product_id } = useParams();
  const [product_info, setProduct_info] = useState(null);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        // Find the product by id
        const product = data.find(
          (item) => item.product_id === Number(product_id)
        );
        setProduct_info(product);
      })
      .catch((err) => console.log("Fetch error:", err));
  }, [product_id]);

  if (!product_info) return <div>Loading...</div>;

  return (
    <div className="aboutPbody">
      <div className="overlay">
        <Menu />
        <div className="listItems">
          <div className="listSlide">
            <ul>
              <li key={product_info.product_id}>
                <h1>{product_info.product_name}</h1>
                <img
                  width="100%"
                  height="200px"
                  src={product_info.product_image}
                  alt={product_info.product_name}
                />
                <p>{product_info.product_description}</p>
                <p>
                  <strong>Price:</strong> ${product_info.product_price}
                </p>
                <p>
                  <strong>Quantity:</strong> {product_info.quantity}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutP;
