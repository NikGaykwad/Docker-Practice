const express = require("express");
const { Client } = require("pg");

const app = express();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
});

client.connect();

app.get("/", async (req, res) => {
  res.send("Docker Compose app is running 🚀");
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});

