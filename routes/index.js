const express = require("express");
const router = express.Router();
var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(__dirname + 'routesdatabase.db');

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.get("/test", (req, res) => {
    db.serialize(function() {
       
        db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
            if (err) {
                throw err;
            }
            res.json({ id: row.id, info: row.info}).status(200);
        });
    });    
});

module.exports = router;