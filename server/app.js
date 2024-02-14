if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = require("./routes/router");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
