import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigation
import Menu from "../components/menu";

function Signin() {
  const [userattempt, setUserattempt] = useState({
    email: "",
    u_password: "",
  });

  const [datav, setDatav] = useState({});
  const navigate = useNavigate(); // ✅ initialize navigation

  const handlechange = (e) => {
    setUserattempt({ ...userattempt, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:2000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userattempt),
    })
      .then((res) => res.json())
      .then((data) => {
        setDatav(data);
        if (data.success) {
          navigate("/");
        } else {
          alert("Invalid email or password");
        }

        setUserattempt({
          email: "",
          u_password: "",
        });
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="signinBody">
      <div className="overlay">
        <Menu />
        <div className="signinPage">
          <div className="signinUser">
            <h2>Log in</h2>
            <form onSubmit={handlesubmit}>
              <label>
                E-mail:
                <input
                  type="email"
                  name="email"
                  value={userattempt.email}
                  placeholder="E-mail"
                  onChange={handlechange}
                  required
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="u_password"
                  value={userattempt.u_password}
                  placeholder="Password"
                  onChange={handlechange}
                  required
                />
              </label>
              <input
                type="submit"
                value="Submit"
                id="sub1"
              />
              <a href="/signup">
                <p>Sign Up</p>
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
