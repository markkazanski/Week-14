var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Arseface04!",
  database: "movie_planner_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.listen(port);

// Root get route
app.get("/", function(req, res) {
  connection.query("SELECT * FROM movies;", function(err, data) {
    if (err) throw err;

    // Test it
    console.log('The solution is: ', data);

    // Test it
    // return res.send(data);

    res.render("index", { movies: data });
  });
});

// movies get route
app.get("/movies", function(req, res) {
  connection.query("SELECT * FROM movies;", function(err, data) {
    if (err) throw err;

    // Test it
    console.log('The solution is: ', data);

    res.json({ movies: data });
  });
});

app.post("/movies", function(req, res) {
  console.log('You sent, ' + req.body.movie);

  connection.query(`INSERT INTO movies (movie) VALUES ("${req.body.movie}")`, function(err, data) {
    if(err) throw err;

    console.log("Query: " + data);
    res.redirect("/");
  });

});

// Delete a movie
app.delete("/movies/:id", function(req, res) {
  connection.query("DELETE FROM movies WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server faliure
      return res.status(500).end();
    } else if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Update a movie
app.put("/movies/:id", function(req, res) {
  connection.query("UPDATE movies SET movie = ? WHERE id = ?", [req.body.movie, req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server faliure
      return res.status(500).end();
    } else if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


