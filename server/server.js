const express = require("express");
const app = express();
const port = process.env.PORT || 3007;
const cors = require("cors");
const validator = require("validator");
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
      "SELECT * FROM sessions2 WHERE to_char(date+1, 'yyyy-mm-dd') = $1 order by id",
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
    .then(() => res.json({ status: `Booking has been updated!` }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});
app.put("/sessions/bookings/:id", function (req, res) {
  let id = Number(req.params.id);
  let { volunteer_id } = req.body;
  console.log("PUT request received for sessionId:", id);
  console.log("Request body:", req.body);
  db.query("UPDATE sessions2 SET volunteer_id = $1 WHERE id = $2", [
    volunteer_id,
    id,
  ])
    .then(() => res.json({ status: `Booking has been successfully deleted` }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});
app.post("/sessions/volunteers", function (req, res) {
  const newName = req.body.name;
  const newPhone = req.body.phone;
  const newEmail = req.body.email;

  const query = `INSERT INTO volunteers (name, phone, email) VALUES ($1, $2, $3)`;
  if (req.body.name && req.body.phone && validator.isEmail(req.body.email)) {
    db.query(query, [newName, newPhone, newEmail])
      .then(() => {
        res.status(201).send("New volunteer has been registered succesfully");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          result: "failure",
          message: "Error. New volunteer details could not be saved",
        });
      });
  } else {
    res
      .status(400)
      .send(
        "Please check the fields have been filled in and email address has correct format i.e. test@example.com"
      );
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
