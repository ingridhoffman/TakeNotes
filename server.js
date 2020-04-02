// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

// Express Server
const app = express();
const PORT = 3000;

// Express middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
// User routes
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Path to database file for API calls
const dbPath = path.join(__dirname, "./db/db.json");
// API route - get notes
app.get("/api/notes", (req, res) => {
	res.sendFile(dbPath);
});
// API route - save new note
app.post("/api/notes", (req, res) => {
	// get note from request body
	const newNote = req.body;
	// add timestamp as note ID
	const newID = Date.now();
	newNote.ID = newID;
	// get existing database file
	fs.readFile(dbPath, (err, data) => {
		if (err) throw err;
		let notes = JSON.parse(data);
		// add new note
		notes.push(newNote);
		let writeNotes = JSON.stringify(notes);
		fs.writeFile(dbPath, writeNotes, err => {
			if (err) throw err;
			console.log("A new note has been added!");
			res.sendFile(dbPath);
		});
	});
});

// Server is Listening
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});
