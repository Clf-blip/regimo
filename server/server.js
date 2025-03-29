const express = require("express");
const jsonServer = require("json-server");
const path = require("path");

const app = express();
const port = process.env.PORT || 10000;

// Debugging: Log paths to check if files exist
console.log("🔍 Serving frontend from:", path.resolve(__dirname, "src", "app"));
console.log("🔍 Serving index.html from:", path.resolve(__dirname, "src", "app", "index.html"));

// Serve frontend files
app.use(express.static(path.resolve(__dirname, "src", "app")));

// Serve JSON Server API
const jsonServerRouter = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
app.use("/api", middlewares, jsonServerRouter);

// Fallback to index.html for frontend routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "src", "app", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
