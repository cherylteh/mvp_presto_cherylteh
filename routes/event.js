var express = require('express');
var router = express.Router();
const db = require("../model/helper");

//localhost:5000/event

const getAllEvents = (req, res) => {
  db("SELECT * FROM event ORDER BY id ASC;")
    .then(results => res.send(results.data))
    .catch(err => console.log(err));
};

/* GET All Events - WORKS
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  db("SELECT * FROM event ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}); */

/* GET All Events (with date formatted) - WORKS */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  db("SELECT eventName, location, DATE_FORMAT(date, '%e %M, %Y') FROM event;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET one Event by Id - WORKS!
router.get("/:id", function(req, res, next) {
    db(`SELECT * FROM event WHERE id=${req.params.id};`)
      .then(results => {
       //console.log(results.data); // for checking
       res.send(results.data[0]);
      })
      .catch(err => res.status(404).send("There is no Event with this title"));
  });

  // ADD new Event - WORKS
router.post("/", function(req, res, next) {
    //let newEvent = req.body;
    db(
      `INSERT INTO event (eventName,location,date) VALUES("${req.body.eventName}", "${req.body.location}", "${req.body.date}")`
    )
      .then(results => {
        getAllEvents(req, res); // get full list of Songs
        res.status(201).send("New event added");
      })
      .catch(err => res.status(500).send(err));
  });
  
  // Update Existing Event - WORKS
  router.put("/:id", (req, res, next) => {
    console.log("Hello");
    // let newItems = req.body;
    console.log(`UPDATE event SET 
    eventName ="${req.body.eventName}", 
    location ="${req.body.location}" 
    date = ${req.body.date}, 
    WHERE id =${req.params.id};`);
    // console.log(req.params.id); // just to check, not necessary
    db(`UPDATE event SET 
        eventName ="${req.body.eventName}", 
        location ="${req.body.location}",
        date = ${req.body.date}, 
        WHERE id =${req.params.id};`)
      .then(results => {
        getAllEvents(req, res); // should get back full list of items
        res.status(201).send("Event Updated");
      })
      .catch(err => res.status(500).send(err));
  });
  
  // DELETE an Event by ID - WORKS
  router.delete("/:id", function(req, res, next) {
    console.log(req.params);
    db(`DELETE FROM event WHERE id=${req.params.id}`)
      .then(results => {
        getAllEvents(req, res);
        res.send("Event deleted");
      })
      .catch(err => res.status(404).send(err));
  });

module.exports = router;