const mysql = require("mysql2/promise");
require("dotenv").config();
const express = require("express");
const config = {
  host: "127.0.0.1",
  user: "root",
  password: "net#graph$",
  database: "userSearch",
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
};
async function query(sql, params) {
  let mysqlConnection;
  try {
    mysqlConnection = await mysql.createConnection(config);
    console.log("Connected to the database");
    const [rows, fields] = await mysqlConnection.execute(sql, params);
    return rows;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  } finally {
    if (mysqlConnection) {
      mysqlConnection.end();
    }
  }
}
module.exports = { query };
