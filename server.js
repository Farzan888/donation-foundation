const express = require("express");
const path = require("path");
const pool = require("./db");
const app = express();

const PORT = 3000;
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500) .send("Database connection failed");
    }
});
app.post("/donor", async (req, res) => {
  try {
    const { full_name, email, phone } = req.body;

    const result = await pool.query(
      `
      INSERT INTO donors (full_name, email, phone)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [full_name, email, phone]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create donor");
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});