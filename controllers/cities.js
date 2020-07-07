const { connection } = require("../conf");

const getCities = async (req, res) => {
  try {
    let { name = "" } = req.query;
    let sqlRequest =
      "SELECT name, description, department, visited, date FROM city";

    if (name) {
      name = `${name}%`;
      sqlRequest =
        "SELECT name, description, department, visited, date FROM city WHERE name LIKE ?";
    }

    // get all cities or search by name

    const [data] = await connection.query(sqlRequest, [name]);
    if (data.length === 0) {
      return res.status(400).send("Find nothing");
    }
    return res.status(200).send(data);
  } catch (e) {
    res.status(500).send("Error while reading cities");
    console.log(err.sql);
    console.log(err.message);
    return;
  }
};

module.exports = { getCities };

// GET with filter 1
// app.get("/api/cities/contain", (req, res) => {
//   const name = req.query.name;
//   connection.query(
//     `SELECT * from city WHERE name LIKE CONCAT("%"?"%") `,
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

// POST
// app.post("/api/cities", (req, res) => {
//   const formData = req.body;
//   connection.query("INSERT INTO city SET ?", [formData], (err, results) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Erreur lors de la sauvegarde d'une ville");
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

// PUT
// app.put("/api/cities/update/:id", (req, res) => {
//   const idCity = req.params.id;
//   const formData = req.body;
//   connection.query(
//     "UPDATE city SET ? WHERE id = ?",
//     [formData, idCity],
//     (err) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Erreur lors de la modification d'une ville");
//       } else {
//         res.sendStatus(200);
//       }
//     }
//   );
// });
