var express = require("express");
const client = require("../db/db");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  client
    .query("SELECT * FROM users;")
    .then((data) => {
      res.send({ status: 200, message: "get successfully", data: data.rows });
    })
    .catch((err) => {
      console.error("Query error", err.stack);
      res.send({ status: 400, message: "bed request" });
    });
});

/* POST user. */
router.post("/", async function (req, res, next) {
  const { username, name, dob, role, email, password, profile_img, active } =
    req.body;
  const query = `
    INSERT INTO users (username, name, dob, role, email, password, profile_img, active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [
    username,
    name,
    dob,
    role,
    email,
    password,
    profile_img,
    active,
  ];
  client
    .query(query, values)
    .then((data) => {
      res.send({ status: 201, message: "add successfully", data: data.rows });
    })
    .catch((err) => {
      console.error("Query error", err.stack);
      res.send({ status: 400, message: "bed request" });
    });
});

// Patch user
router.patch("/", async function (req, res, next) {
  const { username, name, dob, role, email, profile_img, id } = req.body;
  const query = `
  UPDATE users
  SET username = $1,
      name = $2,
      dob = $3,
      role = $4,
      email = $5,
      profile_img = $6
  WHERE id = $7
  RETURNING *;
  `;
  const values = [username, name, dob, role, email, profile_img, id];
  client
    .query(query, values)
    .then((data) => {
      res.send({
        status: 200,
        message: "update successfully",
        data: data.rows,
      });
    })
    .catch((err) => {
      console.error("Query error", err.stack);
      res.send({ status: 400, message: "bed request" });
    });
});

module.exports = router;
