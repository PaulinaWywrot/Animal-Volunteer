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

app.put("/sessions/morning/:id", function (req, res) {
  let id = Number(req.params.id);
  let { morning } = req.body;

  db.query("UPDATE sessions SET morning = $1 WHERE id = $2", [morning, id])
    .then(() => res.json({ status: `Session status has been updated!` }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

app.put("/sessions/evening/:id", function (req, res) {
  let id = Number(req.params.id);
  let evening = req.body.evening;
  console.log(req.body);
  db.query("UPDATE sessions SET evening = $1 WHERE id = $2", [evening, id])
    .then(() => res.json({ status: `Session status has been updated!` }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
