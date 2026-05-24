const express = require('express');
const {handleGetAllUsers, handleGetUserById, handleUpdateUser, handleDeleteUser, handleCreateUser} = require("../controllers/user");
//why do we need router? to separate the routes from the main file and to make the code more organized and modular
const router = express.Router();

// ======================
// HTML Route
// ======================
// router.get("/users", async (req, res) => {

//     const allDbUsers = await User.find();

//     const html = `
//     <ul>
//         ${allDbUsers.map(
//             (user) => `<li>${user.first_name} ${user.last_name}</li>`
//         ).join("")}
//     </ul>
//     `;

//     return res.send(html);
// });

// ======================
// GET ALL USERS
// ======================
router.get("/", handleGetAllUsers);

// ======================
// GET USER BY ID
// ======================
router.get("/:id", handleGetUserById);

// ======================
// CREATE USER
// ======================
router.post("/", handleCreateUser);

// ======================
// UPDATE USER
// ======================
router.patch("/:id", handleUpdateUser);

// ======================
// DELETE USER
// ======================
router.delete("/:id", handleDeleteUser);



module.exports = router;















