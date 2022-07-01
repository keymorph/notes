// This is a temporary solution for checking and creating an user with oauth on cosmosdb
// This should be removed whenever we move to an SQL database
// With an SQL databse we can make a next-auth adapter and handle this logic on the api side
// It can also be done for CosmoSDB but it is not that simple and would be wasted effort if we change the database later on
// https://next-auth.js.org/tutorials/creating-a-database-adapter
import {users} from "../models/database";

export async function createOAuthUserIfNotExists(email) {
  // Check if the email already exists in the database
  const { resources: userItem } = await users.items
    .query(`SELECT * FROM users WHERE users.email = '${email}'`)
    .fetchNext()
    .catch((error) => {
      console.error(error.message);
      return `Database error while registering user: ${error.message}`;
    });

  // If a user with email exists, then email in use
  if (userItem.length !== 0) {
    const { resource: user } = await users.items
      .upsert({
        ...userItem[0],
        oauth: true,
      })
      .catch((error) => {
        console.error(error.message);
        throw `Database error while updating user account: ${error.message}`;
      });
    return user.id;
  }

  const userDef = {
    email: email,
    oauth: true,
    created_at: Math.round(Date.now() / 1000), // Seconds since Unix epoch
  };

  const { resource: user } = await users.items
    .create(userDef)
    .catch((error) => {
      throw `Database error while registering user: ${error.message}`;
    });

  return user.id;
}
