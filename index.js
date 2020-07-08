require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const cities = require("./routes/cities");
const auth = require("./routes/auth");

// Config
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Router
app.use("/cities", cities);
// app.use("/users", users);
app.use("/auth", auth);

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on http://localhost:${port}`);
});

/* OTHER ROUTES FOR QUEST */

// GET all cities
// app.get("/api/cities", (req, res) => {
//   connection.query("SELECT * from city", (err, results) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Erreur lors de la récupération des données");
//     } else {
//       res.json(results);
//     }
//   });
// });

// GET with filter 2 begin by ?%
// app.get("/api/cities/begin", (req, res) => {
//   const name = req.query.name;
//   connection.query(
//     `SELECT * FROM city WHERE name LIKE CONCAT(?"%")`,
//     [name],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Erreur lors de la récupération des données");
//       } else {
//         res.json(results);
//       }
//     }
//   );
// });

// GET with filter 3 greater than
// app.get("/api/cities/greater", (req, res) => {
//   const date = req.query.date;
//   connection.query(
//     `SELECT * FROM city WHERE date > ?`,
//     [date],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Erreur lors de la récupération des données");
//       } else {
//         res.json(results);
//       }
//     }
//   );
// });

// GET sort
// app.get("/api/cities/:sort", (req, res) => {
//   const sort = req.params.sort;
//   connection.query(
//     `SELECT * from city ORDER BY name ${sort === "asc" ? "ASC" : "DESC"}`,
//     [sort],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Erreur lors de la récupération des données");
//       } else {
//         res.json(results);
//       }
//     }
//   );
// });

// PUT toggle boolean
// app.put("/api/cities/toggle", (req, res) => {
//   connection.query("UPDATE city SET visited = IF (visited, 0, 1)", (err) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Erreur lors de la modification d'une ville");
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

// DELETE
// app.delete("/api/cities/names/:id", (req, res) => {
//   const idCity = req.params.id;
//   connection.query("DELETE FROM city WHERE id = ?", [idCity], (err) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Erreur lors de la suppression d'une ville");
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

//DELETE only false
// app.delete("/api/cities/non-visited", (req, res) => {
//   connection.query(
//     "DELETE FROM city WHERE visited = 0",
//     [nonVisited],
//     (err) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Erreur lors de la suppression d'une ville");
//       } else {
//         res.sendStatus(200);
//       }
//     }
//   );
// });
