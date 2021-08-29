var express = require('express');
var router = express.Router();
const db = require("../model/helper");

//localhost:5000/eventsong

const getAllEventSongs = (req, res) => {
  db("SELECT * FROM eventsong ORDER BY eventID;")
    .then(results => res.send(results.data))
    .catch(err => console.log(err));
};

//GET All Events with Song - WORKS but only returns one song!
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  db("SELECT * FROM eventsong ORDER BY eventID;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET one Event by ID - WORKS!
router.get("/:id", function(req, res, next) {
    db(`SELECT * FROM eventsong WHERE eventID=${req.params.id};`)
      .then(results => {
       //console.log(results.data); // for checking
       res.send(results.data[0]);
      })
      .catch(err => res.status(404).send("There is no Event with this title"));
  });

  // ADD new Songs to Event  - WORKS
router.post("/", function(req, res, next) {
    //let newEvent = req.body;
    db(
      `INSERT INTO eventsong (eventID,songlibID) VALUES("${req.body.eventID}", "${req.body.songlibID}")`
    )
      .then(results => {
        getAllEventSongs(req, res); // get full list of Songs
        res.status(201).send("New Song added to event");
      })
      .catch(err => res.status(500).send(err));
  });
  
  // Update Existing Event with Songs
  router.put("/:id", (req, res, next) => {
    console.log("Hello");
    // let newItems = req.body;
    console.log(`UPDATE eventsong SET 
    songlibID ="${req.body.songlibID}", 
    WHERE eventID =${req.params.id};`);
    // console.log(req.params.id); // just to check, not necessary
    db(`UPDATE eventsong SET 
        songlibID ="${req.body.songlibID}", 
        WHERE eventID =${req.params.id};`)
      .then(results => {
        getAllEventSongs(req, res); // should get back full list of items
        res.status(201).send("Event Songs Updated");
      })
      .catch(err => res.status(500).send(err));
  });
  
  // DELETE a Song from the Event by ID 
  router.delete("/:id", function(req, res, next) {
    console.log(req.params);
    db(`DELETE FROM eventsong WHERE id=${req.params.id}`)
      .then(results => {
        getAllEventSongs(req, res);
        res.send("Event deleted");
      })
      .catch(err => res.status(404).send(err));
  });

module.exports = router;