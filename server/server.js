const express = require("express");
const path = require("path");
const jsonServer = require("json-server");

const app = express();
const port = process.env.PORT || 1000;

// Serve the frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

// JSON Server setup
const jsonRouter = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
app.use("/api", middlewares, jsonRouter);

// Catch-all route to serve React app for all frontend routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
