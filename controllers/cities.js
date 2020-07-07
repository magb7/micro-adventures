const { connection } = require("../conf");

const getCities = async (req, res) => {
  try {
    let { name = "" } = req.query;
    let sqlRequest =
      "SELECT name, description, department, visited, date FROM city";

    if (name) {
      name = `%${name}%`;
      sqlRequest =
        "SELECT name, description, department, visited, date FROM city WHERE name LIKE ?";
    }

    // get all cities or search by name

    const [data] = await connection.query(sqlRequest, [name]);
    if (data.length === 0) {
      return res.status(400).send("Find nothing");
    }
    return res.status(200).send(data);
  } catch (err) {
    res.status(500).send("Error while reading cities");
    console.log(err.sql);
    console.log(err.message);
    return;
  }
};

const createCity = async (req, res) => {
  try {
    const city = await connection.query("INSERT INTO city SET ?", [req.body]);
    return res.status(200).send(req.body);
  } catch (err) {
    res.status(500).send("Error while creating cities");
    console.log(err.sql);
    console.log(err.message);
    return;
  }
};

module.exports = { getCities, createCity };

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
