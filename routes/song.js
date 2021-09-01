var express = require('express');
var router = express.Router();
const db = require("../model/helper");

const getAllSongs = (req, res) => {
  db("SELECT * FROM songlib ORDER BY id DESC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => console.log(err));
};

//GET All Songs (by Id) - WORKS!
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  db("SELECT * FROM songlib ORDER BY id DESC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//GET All Songs (by Composer) - WORKS!
router.get('/composer', function(req, res, next) {
  //res.send('respond with a resource');
  db("SELECT * FROM songlib ORDER BY composer ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//GET All Songs (by Title) - WORKS!
router.get('/title', function(req, res, next) {
  //res.send('respond with a resource');
  db("SELECT * FROM songlib ORDER BY title ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET one Song by Id - WORKS!
router.get("/:id", function(req, res, next) {
  db(`SELECT * FROM songlib WHERE id=${req.params.id};`)
    .then(results => {
     //console.log(results.data); // for checking
     res.send(results.data[0]);
    })
    .catch(err => res.status(404).send("There is no Song with this title"));
});

// GET one Song by Title - WORKS
router.get("/title/:title", function(req, res, next) {
  db(`SELECT * FROM songlib WHERE title="${req.params.title}";`)
    .then(results => {
     console.log(results.data); // for checking
     res.send(results.data);
    })
    .catch(err => res.status(404).send("There is no Song with this title"));
});

// GET one Song by Composer - WORKS
router.get("/composer/:composer", function(req, res, next) {
  db(`SELECT * FROM songlib WHERE composer="${req.params.composer}";`)
    .then(results => {
      console.log(results.data); // for checking
     // res.send(results.data[title]);
    })
    .catch(err => res.status(404).send("There is no Song with this composer"));
});

// ADD new Song - WORKS
router.post("/", function(req, res, next) {
  //let newSong = req.body;
  db(
    `INSERT INTO songlib (title,composer,parts) VALUES("${req.body.title}", "${req.body.composer}", "${req.body.parts}")`
  ).then(results => {
      getAllSongs(req, res); // get full list of Songs
      //res.status(201).send("New song added");
    })
    .catch(err => res.status(500).send(err));
});

// Update Existing Song
router.put("/:id", (req, res, next) => {
  console.log("Hello");
  // let newItems = req.body;
  console.log(`UPDATE songlib SET 
  title ="${req.body.title}", 
  composer ="${req.body.composer}", 
  parts ="${req.body.parts}" 
  WHERE id =${req.params.id};`);
  // console.log(req.params.id); // just to check, not necessary
  db(`UPDATE songlib SET 
      title ="${req.body.title}", 
      composer ="${req.body.composer}",
      parts ="${req.body.parts}"  
      WHERE id =${req.params.id};`)
    .then(results => {
      getAllSongs(req, res); // should get back full list of items
      res.status(201).send("Updated");
    })
    .catch(err => res.status(500).send(err));
});

// DELETE a song by ID
router.delete("/:id", function(req, res, next) {
  console.log(req.params);
  db(`DELETE FROM songlib WHERE id=${req.params.id}`)
    .then(results => {
      getAllSongs(req, res);
      //res.send("Song deleted");
    })
    .catch(err => res.status(404).send(err));
});



module.exports = router;
