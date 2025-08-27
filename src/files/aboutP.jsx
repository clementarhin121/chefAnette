import { useEffect } from "react";
import Menu from "../components/menu";
import { useParams } from "react-router-dom";
import { useState } from "react";

function AboutP() {
  const { product_id } = useParams();
  const [product_info, setProduct_info] = useState();

  useEffect(() => {
    fetch(`http://localhost:2000/db/${product_id}`)
      .then((res) => res.json())
      .then((data) => setProduct_info(data))
      .catch((err) => console.log("Fetch error:", err));
  }, [product_id]);

  if (!product_info) return <div>Loading...</div>;

  return (
    <>
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
                    alt=""
                  />
                  <p>{product_info.product_description}</p>
                  <p>${product_info.product_price}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutP;
