// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

// const notes = require("../db/db.json");

const fs = require('fs');
const path = require('path');

// ===============================================================================// ROUTING
// ===============================================================================

module.exports = function(app) {

  fs.readFile('db/db.json','utf8', function(err, data) {
    if (err) throw err;
    
    var notes = JSON.parse(data);
    
  
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    res.json(notes);
  });

  app.post("/api/notes", function(req, res){
    let newNote = req.body;
    notes.push(newNote);
    updateDb();
    return console.log("Added new note: " + newNote.title);

    // console.log(req.body);
    // ID needs a random number (math.random or uuid package)
    // req.body.id = 2; 
    // console.log(req.body);
    // noteData.push(req.body);

    // res.json(noteData);
  });

  app.get("/api/notes/:id", function (req, res){
    res.json(notes[req.param.id]);
  })
// req.body - access to the new note
// need to add an ID to the note 
// put the new note in noteData.push -> req.body
// make sure our new note is saved on db.json
// the new noteData

// newNote writing noteData to db.json

app.delete("/api/notes/:id", function(req, res){
  notes.splice(req.params.id, 1);
  updateDb();
  console.log("Deleted note with id "+req.params.id);
});




function updateDb() {
  fs.writeFile('db/db.json', (JSON.stringify(notes)), function(err){
      if (err) throw err;
      return true;
  });
}

  })
}


