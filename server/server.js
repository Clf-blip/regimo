const express = require("express");
const jsonServer = require("json-server");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 10000;

// 🔍 Detect Correct Frontend Path
const possiblePaths = [
  path.join(__dirname, "src", "app"), // Default location
  path.join(__dirname, "..", "src", "app"), // If deployed differently
  path.join(__dirname, "public"), // Fallback to public/
];

// Find an existing frontend folder
const frontendPath = possiblePaths.find((p) => fs.existsSync(p)) || possiblePaths[0];
const indexPath = path.join(frontendPath, "index.html");

// 🔍 Debugging Logs
console.log("🔍 Checking if frontend folder exists:", fs.existsSync(frontendPath));
console.log("🔍 Checking if index.html exists:", fs.existsSync(indexPath));
console.log("📂 Serving frontend from:", frontendPath);

// 🔍 Print Directory Structure for Debugging (Render Logs)
const recursiveReadDir = (dir) => {
  try {
    return fs.readdirSync(dir, { withFileTypes: true }).map((file) => ({
      name: file.name,
      type: file.isDirectory() ? "📁 Folder" : "📄 File",
    }));
  } catch (err) {
    return [`❌ Error reading directory: ${dir} - ${err.message}`];
  }
};

console.log("📂 Project Structure:", recursiveReadDir(__dirname));

// Serve Frontend Files (if available)
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
} else {
  console.error("❌ Frontend folder not found:", frontendPath);
}

// Serve JSON Server API
const jsonServerRouter = jsonServer.router("db.json");
app.use("/api", jsonServer.defaults(), jsonServerRouter);

// Fallback for Frontend Routes
app.get("*", (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error("❌ Error: index.html not found at", indexPath);
    res.status(500).send("Internal Server Error: index.html not found.");
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
