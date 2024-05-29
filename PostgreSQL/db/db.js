const { Client } = require("pg");

// Create a new instance of the client
const client = new Client({
  user: "postgres",
  host: "127.0.0.1",
  database: "testing",
  password: "123456",
  port: 5432, // default port for PostgreSQL
});

// Connect to the database
client
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Connection error", err.stack));

// Export the client to use in other parts of the application
module.exports = client;
