const express = require("express");
const path = require("path");
const jsonServer = require("json-server");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 1000;

// ✅ Serve frontend files from regimo/src/app
const frontendPath = path.join(__dirname, "src/app");

// Check if index.html exists before serving frontend
if (fs.existsSync(path.join(frontendPath, "index.html"))) {
    app.use(express.static(frontendPath));
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
} else {
    console.log("⚠️ Frontend build not found. Skipping frontend setup.");
}

// ✅ JSON Server for API routes
const jsonRouter = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
app.use("/api", middlewares, jsonRouter);

// ✅ Start the server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
