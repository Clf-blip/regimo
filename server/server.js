const express = require("express");
const jsonServer = require("json-server");
const path = require("path");

const app = express();
const port = process.env.PORT || 10000;

// Serve frontend files
app.use(express.static(path.join(__dirname, "src", "app")));

// Serve JSON Server API
const jsonServerRouter = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
app.use("/api", middlewares, jsonServerRouter);

// Fallback to index.html for frontend routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "app", "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
