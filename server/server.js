const express = require("express");
const app = express();
const port = process.env.PORT || 3007;
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("App is working");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
