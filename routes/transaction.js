var express = require('express');
var router = express.Router();
const db = require("../model/helper");

//localhost:5000/transaction

const getAll = (req, res) => {
  db("SELECT * FROM transaction ORDER BY id ASC;")
    .then(results => res.send(results.data))
    .catch(err => console.log(err));
};

/* GET All Events - WORKS */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  db("SELECT * FROM transaction ORDER BY date ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

/* GET All Events (with date formatted) - WORKS 
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  db("SELECT eventName, location, DATE_FORMAT(date, '%e %M, %Y') FROM event;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}); */

// GET one Event by Id - WORKS!
router.get("/:id", function(req, res, next) {
    db(`SELECT * FROM transaction WHERE id=${req.params.id};`)
      .then(results => {
       //console.log(results.data); // for checking
       res.send(results.data[0]);
      })
      .catch(err => res.status(404).send("There is no Event with this title"));
  });

  // ADD new Event - WORKS
router.post("/", function(req, res, next) {
    //let newEvent = req.body;
    console.log(req.body.Folio, req.body.amount, "API route")
    db(
      `INSERT INTO transaction (date,particular, folio, amount_RM) VALUES('${req.body.date}', '${req.body.particular}', '${req.body.Folio}', ${req.body.amount});`
    )
      .then(results => {
        getAll(req, res); // get full list of Songs
        res.status(201).send("New event added");
      })
      .catch(err => res.status(500).send(err));
  });
  
  // Update Existing Event - WORKS
  router.put("/:id", (req, res, next) => {
    db(`UPDATE transaction SET 
    date ="${req.body.date}", 
    particular ="${req.body.particular}",
    folio = ${req.body.folio}, 
    amount_RM = ${req.body.amount_RM},
    balance_RM = ${req.body.balance_RM}
    WHERE id =${req.params.id};`)
      .then(results => {
        getAll(req, res); // should get back full list of items
        res.status(201).send("Event Updated");
      })
      .catch(err => res.status(500).send(err));
  });
  
  // DELETE an Event by ID - WORKS
  router.delete("/:id", function(req, res, next) {
    console.log(req.params);
    db(`DELETE FROM transaction WHERE id=${req.params.id}`)
      .then(results => {
        getAll(req, res);
        //res.send("Event deleted");
      })
      .catch(err => res.status(404).send(err));
  });

module.exports = router;