
const fs = require("fs");
const path = require("path");

// all the notes with be saved in this db.json file
let savedNotes = require("../db/db.json");
console.log(savedNotes);

module.exports = app => {
    app.get("/api/notes", function(req, res) {
        res.json(savedNotes)
    });

    app.post("/api/notes", function(req, res) {


        var newNote = req.body
        console.log(newNote);

        newNote.id = Math.floor(Math.random() * 5000000000);
        console.log(newNote)
        savedNotes.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err) =>  {
            if (err) throw error;
        })
        res.json(newNote);
    });

    app.delete("/api/notes/:id", function(req, res) {
        const removeNote = req.params.id;

        const newNotes = [];

        for (let i = 0; i < savedNotes.length; i++) {
            if (savedNotes[i].id != removeNote){
            newNotes.push(savedNotes[i])};
        }

        fs.writeFile("./db/db.json", JSON.stringify(newNotes), () => {
            console.log("Deleted Note");
        });

        savedNotes = newNotes;

        res.json(newNotes);
    });
};

