import bcrypt from "bcrypt";

import { users } from "../models/database.js";

const registerAccount = async (email, password, res) => {
  // Check if the email already exists in the database
  const { resources: userItem } = await users.items
    .query(`SELECT * FROM users WHERE users.email = '${email}'`)
    .fetchNext()
    .catch((error) => {
      console.error(error.message);
      res.status(500).json({
        error: `Database error while registering user: ${error.message}`,
      });
    });

  // If a user with email exists, then email in use
  if (userItem.length !== 0)
    return res.status(409).json({ message: "Email already in use." });

  return bcrypt.hash(password, 10, (error, hash) => {
    const userDef = {
      email: email,
      password: hash,
      created_at: Math.round(Date.now() / 1000), // Seconds since Unix epoch
    };

    if (error) {
      console.error(error.message);
      return res.status(500).json({
        message: `Error while hashing the password: ${error.message}`,
      });
    }

    return users.items
      .create(userDef)
      .then(({ resource: user }) => {
        return res
          .status(201)
          .json({ message: "User account created successfully 🥳." });
      })
      .catch((error) => {
        return res.status(550).json({
          message: `Database error while registering user: ${error.message}`,
        });
      });
  });
};

const loginAccount = async (email, password, res) => {
  return await users.items
    .query(`SELECT * FROM users WHERE users.email = '${email}'`)
    .fetchNext()
    .then(async ({ resources }) => {
      // Check if account exists
      if (resources.length === 0) {
        console.error("Account doesn't exist.");
        return res.status(401).json({
          error: `This Account doesn't exist.`,
        });
      }
      // Check if password is correct
      const validPassword = await bcrypt.compare(
        password,
        resources[0].password
      );
      if (!validPassword) {
        console.error("Incorrect password.");
        return res.status(400).json({
          error: "The email address or password entered is invalid.",
        });
      }
      return res
        .status(200)
        .json({ user_id: resources[0].id, email: resources[0].email });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({
        error: `Database error while logging in user: ${error.message}`,
      });
    });
};

const removeAccount = async (req, res) => {
  // TODO: Delete all user's notes by looping through the noteService delete method
  // Old method of deleting notes when it was using MySQL
  // users.query(
  //     `DELETE FROM notes WHERE user_id = '${req.user_id}';`,
  //     async (err, results) => {
  //         if (err) throw err
  //         if (results.affectedRows === 0) {
  //             return res.status(400).json({ error : `Note deletion unsuccessful. AKA Couldn't Find Note(s).` })
  //         }
  //         return res.status(200).json({ message : `Account & Notes deleted.` })
  // })
  users
    .item(req.user_id, req.user_id)
    .delete()
    .then(() => {
      return res.status(200).json({ message: "User deleted successfully." });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(500).json({
        message: `Database error while attempting to delete user:\n${error.message}`,
      });
    });
};

const userService = {
  register: registerAccount,
  login: loginAccount,
  remove: removeAccount,
};

export default userService;
