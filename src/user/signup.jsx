import { useState } from "react";
import Menu from "../components/menu";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profilepic: "",
    u_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:2000/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Submitted:", data);
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            profilepic: "",
            u_password: "",
          });
          navigate("/signin");
        }
      });
  };

  return (
    <div className="signupBody">
      <div className="overlay">
        <Menu />
        <div className="signupPage">
          <div className="signupUser">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="first_name">
                First name:
                <input
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="last_name">
                Last name:
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="email">
                E-mail:
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="profilepic">
                Profile Pic:
                <input
                  type="text"
                  name="profilepic"
                  placeholder="Profilepic"
                  value={formData.profilepic}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="u_password">
                Password:
                <input
                  type="password"
                  name="u_password"
                  placeholder="Password"
                  value={formData.u_password}
                  onChange={handleChange}
                />
              </label>
              <input
                type="submit"
                value="Submit"
                id="sub1"
              />
              <a href="/signin">
                <p>Sign in</p>
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
