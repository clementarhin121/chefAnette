import { useNavigate } from "react-router-dom";
import Menu from "../components/menu";
function Home() {
  const navigate = useNavigate();
  const goProducts = () => {
    navigate("/products");
  };

  return (
    <>
      <div className="homeBody">
        <div className="overlay">
          <Menu></Menu>
          <div className="bodyb"></div>
          <div className="openBooking">
            <h3>Open For Lunch, Dinner</h3>
            <button onClick={goProducts}>PLACE &nbsp; ORDERS</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
