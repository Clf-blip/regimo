const express = require("express");
const jsonServer = require("json-server");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 10000;

// 🔍 Adjust frontend path
const frontendPath = path.join(__dirname, "src", "app");
const indexPath = path.join(frontendPath, "index.html");

// 🔍 Debugging Logs
console.log("🔍 Checking if frontend folder exists:", fs.existsSync(frontendPath));
console.log("🔍 Checking if index.html exists:", fs.existsSync(indexPath));

// Serve frontend files
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
} else {
  console.error("❌ Frontend folder not found:", frontendPath);
}

// Serve JSON Server API
const jsonServerRouter = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
app.use("/api", middlewares, jsonServerRouter);

// Fallback for frontend routes
app.get("*", (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error("❌ Error: index.html not found at", indexPath);
    res.status(500).send("Internal Server Error: index.html not found.");
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
