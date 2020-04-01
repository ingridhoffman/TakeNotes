// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

// Express Server
const app = express();
const PORT = 3000;

// ROUTES
// User route - Home Page
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});
// User route - Notes page
app.get("/notes", function(req, res) {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// API route - get notes
app.get("/api/notes", function(req, res) {
	res.sendFile(path.join(__dirname, "./db/db.json"));
});

// Server is Listening
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});
