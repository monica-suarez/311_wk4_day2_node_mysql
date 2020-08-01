const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  const id = req.params.id;
  let sql = 'SELECT ?? FROM ?? WHERE ?? = ?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['*', 'users', 'id', id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = 'INSERT INTO ?? (??, ??) VALUES (?, ?)'
  // WHAT GOES IN THE BRACKETS
  let newUser = req.body;
  first_name = newUser.first_name
  last_name = newUser.last_name
  sql = mysql.format(sql, ['users', 'first_name', 'last_name', first_name, last_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  const id = req.params.id;
  // let originalFirst = req.params.first_name
  // let originalLast = req.params.last_name
  let updatedUser = req.body
  const first_name = updatedUser.first_name 
  const last_name = updatedUser.last_name 
  let sql = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', first_name, 'last_name', last_name, 'id', id ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json({ message: `Updated ${results.affectedRows} user(s)` });
  })
}


const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  const first_name = req.params.first_name;
  let sql = "DELETE FROM ?? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', first_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}