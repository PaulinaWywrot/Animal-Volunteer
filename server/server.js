const express = require("express");
const app = express();
const port = process.env.PORT || 3007;
const cors = require("cors");
app.use(express.json());
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

app.get("/sessions", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM sessions ORDER BY id");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch sessions" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
