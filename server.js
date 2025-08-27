const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 2000;

// Connect to MySQL
const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  database: "chef",
  password: "12345678",
});

db.connect((err) => {
  if (err) console.error("DB connection error:", err);
  else console.log("DB connected!");
});

// Test route
app.get("/", (req, res) => {
  res.json("Hello, world!");
});

app.get("/db", (req, res) => {
  const mysql = `select * from products`;

  db.query(mysql, (err, data) => {
    if (err) return "error";

    return res.json(data);
  });
});
// Get product by ID
app.get("/db/:id", (req, res) => {
  const sql = "SELECT * FROM products WHERE product_id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return single product object
    res.json(data[0]);
  });
});

// Add new user
app.post("/addUser", (req, res) => {
  const { first_name, last_name, email, profilepic, u_password } = req.body;

  const checkSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkSql, [email], (err, data) => {
    if (err)
      return res.status(500).json({ success: false, message: "DB error" });
    if (data.length > 0)
      return res.json({ success: false, message: "Email already exists" });

    const sql =
      "INSERT INTO users (first_name, last_name, email, profilepic, u_password) VALUES (?, ?, ?, ?, ?)";
    const values = [first_name, last_name, email, profilepic, u_password];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("DB error:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error adding user" });
      }
      return res.json({
        success: true,
        user: {
          user_id: result.insertId,
          first_name,
          last_name,
          email,
          profilepic,
        },
      });
    });
  });
});

// Signin route
app.post("/signin", (req, res) => {
  const { email, u_password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND u_password = ?";
  const values = [email, u_password];

  db.query(sql, values, (err, data) => {
    if (err)
      return res.status(500).json({ success: false, message: "Server error" });

    if (data.length > 0) {
      return res.json({ success: true, user: data[0] });
    } else {
      return res.json({ success: false, message: "Invalid email or password" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
