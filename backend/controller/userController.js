const User = require("../models/userModel");
const getUserById = (req, res) => {
  const user = User.findById(req.params.id);
};
// const createUser = (req, res) => {
//   const newUser = User.create(req.body);
// };
// const getAllUsers = (req, res) => {
//   const users = User.findAll();
// };

// const updateUserById = (req, res) => {
//   const updatedUser = User.updateById(req.params.id, req.body);
// };

// const deleteUserById = (req, res) => {
//   User.deleteById(req.params.id);
// };

module.exports = {
  //   createUser,
  //   getAllUsers,
  //   updateUserById,
  //   deleteUserById,
  getUserById,
};
