const express = require("express");
const jsonServer = require("json-server");
const path = require("path");

const app = express();
const port = process.env.PORT || 10000;

// Correct the path (remove extra "server" directory)
const frontendPath = path.join(__dirname, "src", "app");
const indexPath = path.join(frontendPath, "index.html");

// Debugging logs
console.log("🔍 Serving frontend from:", frontendPath);
console.log("🔍 Serving index.html from:", indexPath);

// Serve frontend files
app.use(express.static(frontendPath));

// Serve JSON Server API
const jsonServerRouter = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
app.use("/api", middlewares, jsonServerRouter);

// Fallback to index.html for frontend routes
app.get("*", (req, res) => {
  res.sendFile(indexPath);
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
