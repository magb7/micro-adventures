const express = require("express");
const app = express();
const port = 5000;
const connection = require("./conf");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// GET all data
app.get("/api/cities", (req, res) => {
  connection.query("SELECT * from city", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données");
    } else {
      res.json(results);
    }
  });
});

// GET name
app.get("/api/cities/names", (req, res) => {
  connection.query("SELECT name from city", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données");
    } else {
      res.json(results);
    }
  });
});

// GET with filter 1
app.get("/api/cities/search", (req, res) => {
  const name = req.query.name;
  connection.query(
    "SELECT name from city WHERE name LIKE ? ",
    [name],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des données");
      } else {
        res.json(results);
      }
    }
  );
});

// GET with filter 2 begin by ?%
app.get("/api/cities/names", (req, res) => {
  connection.query("SELECT name from city", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données");
    } else {
      res.json(results);
    }
  });
});

// GET with filter 3 greater than
app.get("/api/cities/names", (req, res) => {
  connection.query("SELECT name from city", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des données");
    } else {
      res.json(results);
    }
  });
});

// GET sort
app.get("/api/cities/:sort", (req, res) => {
  const sort = req.params.sort;
  connection.query(
    "SELECT name from city ORDER BY name ? ",
    [sort],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la récupération des données");
      } else {
        res.json(results);
      }
    }
  );
});

// POST
app.post("/api/cities", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO city SET ?", [formData], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'une ville");
    } else {
      res.sendStatus(200);
    }
  });
});

// PUT
app.put("/api/cities/:id", (req, res) => {
  const idCity = req.params.id;
  const formData = req.body;
  connection.query(
    "UPDATE city SET ? WHERE id = ?",
    [formData, idCity],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'une ville");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// PUT toggle boolean

// DELETE
app.delete("/api/cities/names/:id", (req, res) => {
  const idCity = req.params.id;
  connection.query("DELETE FROM city WHERE id = ?", [idCity], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'une ville");
    } else {
      res.sendStatus(200);
    }
  });
});

//DELETE only false
app.delete("/api/cities/non-visited", (req, res) => {
  const nonVisited = req.params.false;
  connection.query(
    "DELETE FROM city WHERE visited = 0",
    [nonVisited],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la suppression d'une ville");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
