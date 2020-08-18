
// const fs = require("fs");
// const path = require("path");

// // all the notes with be saved in this db.json file
// let savedNotes = require("../db/db.json");
// console.log(savedNotes);

// module.exports = app => {
//     app.get("/api/notes", function(req, res) {
//         res.json(savedNotes)
//     });

//     app.post("/api/notes", function(req, res) {
//         var newNote = req.body
//         console.log(newNote);

//         newNote.id = Math.floor(Math.random() * 5000000000);
//         console.log(newNote)
//         savedNotes.push(newNote);
//         fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err) =>  {
//             if (err) throw error;
//         })
//         res.json(newNote);
//     });

//     app.delete("/api/notes/:id", function(req, res) {
//         const removeNote = req.params.id;

//         const newNotes = [];

//         for (let i = 0; i < savedNotes.length; i++) {
//             if (savedNotes[i].id != removeNote){
//             newNotes.push(savedNotes[i])};
//         }

//         fs.writeFile("./db/db.json", JSON.stringify(newNotes), () => {
//             console.log("Deleted Note");
//         });

//         savedNotes = newNotes;

//         res.json(newNotes);
//     });
// };


const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require("uuid");

module.exports = app => {

    // Setup notes variable
    fs.readFile("db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        var noteData = JSON.parse(data);

        // API ROUTES
        // ========================================================

        // Setup the /api/notes get route
        app.get("/api/notes", function (req, res) {
            // Read the db.json file and return all saved notes as JSON.
            res.json(noteData);
        });

        // Setup the /api/notes post route
        app.post("/api/notes", function (req, res) {
            // Receives a new note, adds it to db.json, then returns the new note

            let newNote = req.body;
            newNote.id = uuidv4();
            console.log(newNote);
            noteData.push(newNote);
            updateDb();
            res.json(newNote);
        });

        // Retrieves a note with specific id
        app.get("/api/notes/:id", function (req, res) {
            // display json for the notes array indices of the provided id
            res.json(noteData[req.params.id]);
        });

        // Deletes a note with specific id
        app.delete("/api/notes/:id", function (req, res) {
            let deleteNote = req.params.id;
            noteData = noteData.filter(function(note){
                return note.id != deleteNote;
            });
            updateDb();
            console.log("Deleted note with id " + req.params.id);
            res.json(true);
        });

        // VIEW ROUTES
        // ========================================================

        // Display notes.html when /notes is accessed
        app.get('/notes', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // Display index.html when all other routes are accessed
        app.get('/', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });
        // If no matching route is found default to home
        app.get("*", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/404.html"));
        });


        //updates the json file whenever a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(noteData, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }

    });

}
