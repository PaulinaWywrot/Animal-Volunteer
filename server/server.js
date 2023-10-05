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
    const result = await db.query("SELECT * FROM sessions2 ORDER BY id");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch sessions" });
  }
});

app.get("/sessions/calendar/:date", async (req, res) => {
  let date = req.params.date;
  try {
    const result = await db.query(
      "SELECT * FROM sessions2 WHERE to_char(date, 'yyyy-mm-dd') = $1",
      [date]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

app.get("/sessions/volunteers", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM volunteers ORDER BY id");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch volunteers details" });
  }
});
app.put("/sessions/:id", function (req, res) {
  let id = Number(req.params.id);
  let { volunteer_id } = req.body;

  db.query("UPDATE sessions2 SET volunteer_id = $1 WHERE id = $2", [
    volunteer_id,
    id,
  ])
    .then(() => res.json({ status: `Volunteer id has been updated!` }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});
app.listen(port, () => console.log(`Listening on port ${port}`));
