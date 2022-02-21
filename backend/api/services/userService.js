import { users } from "../models/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const register = async (email, password, res) => {
  // Check if the email already exists in the database
  const user = (
    await users.items
      .query(`SELECT * FROM users WHERE users.email = '${email}'`)
      .fetchNext()
  )?.resources;
  if (user.email === email)
    return res.status(409).send("Email already in use.");

  bcrypt.hash(password, 10, (err, hash) => {
    const userDef = {
      email: email,
      password: hash,
      created_at: Math.round(Date.now() / 1000), // Seconds since Unix epoch
    };

    if (!err) {
      users.items
        .create(userDef)
        .then(() => {
          return res
            .status(201)
            .json({ message: "User account created successfully 🥳." });
        })
        .catch((err) => {
          return res
            .status(550)
            .json({
              message: `Database error while registering user:\n${err}`,
            });
        });
    } else {
      console.error(err);
      return res
        .status(500)
        .json({ message: `Error while hashing the password: ${err}` });
    }
  });
};

const login = async (email, password, res, remember = false) => {
  await users.items
    .query(`SELECT * FROM users WHERE users.email = '${email}'`)
    .fetchNext()
    .then(({ resources }) => {
      // Check if account exists
      if (resources.length === 0) {
        console.log("Account doesn't exist.");
        return res.status(401).json({
          message: `This Account doesn't exist. Try a different Email.`,
        });
      }
      // Return token if password is correct
      const validPassword = bcrypt.compare(password, resources[0].password);
      if (!validPassword) {
        console.log("Incorrect password.");
        return res.status(400).json({
          message:
            "The email address or password you entered is invalid. Please try again.",
        });
      }

      // TODO: Implement remember me feature with cookies
      // if(remember) {
      //     const token = jwt.sign({ id: resources[0].id }, process.env.AUTH_TOKEN_SECRET, { expiresIn: '1y' });
      //     res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 365, httpOnly: true, sameSite: "strict" });
      // }
      // else {
      //     const token = jwt.sign({ id: resources[0].id }, process.env.AUTH_TOKEN_SECRET, { expiresIn: '1h' });
      //     res.cookie('token', token, { maxAge: 1000 * 60 * 60, httpOnly: true, sameSite: "strict" });
      // }

      const accessToken = jwt.sign(
        { userID: resources[0].id },
        process.env.AUTH_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ accessToken: accessToken });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ message: `Database error while logging in user:\n${err}` });
    });
};

const remove = async (req, res) => {
  // TODO: Delete all user's notes by looping through the noteService delete method
  // Below you can see the old method of deleting notes when it was using MySQL
  // users.query(
  //     `DELETE FROM notes WHERE userID = '${req.userID}';`,
  //     async (err, results) => {
  //         if (err) throw err
  //         if (results.affectedRows === 0) {
  //             return res.status(400).json({ error : `Note deletion unsuccessful. AKA Couldn't Find Note(s).` })
  //         }
  //         return res.status(200).json({ message : `Account & Notes deleted.` })
  // })
  users
    .item(req.userID, req.userID)
    .delete()
    .then(() => {
      return res.status(200).json({ message: "User deleted successfully." });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: `Database error while attempting to delete user:\n${err}`,
      });
    });
};

const userService = { register, login, remove };
export default userService;
