import { CosmosClient } from "@azure/cosmos";

const config = {
    endpoint: process.env.COSMOSDB_ENDPOINT,
    key: process.env.COSMOSDB_KEY
}
const client = new CosmosClient(config);

// Get database
const { database } = await client.databases.createIfNotExists({ id: process.env.COSMOSDB_DATABASE})
  .catch(err => {
      console.error('Error getting the database:\n', err);
  });

// Get users container items
const { usersContainer } = await database.containers.createIfNotExists({ id: process.env.COSMOSDB_USERS_CONTAINER })
    .catch(err => {
        console.error(err);
    });

// Get notes container items for jotfox
const { notesContainer } = await database.containers.createIfNotExists({ id: process.env.COSMOSDB_NOTES_CONTAINER })
    .catch(err => {
        console.error(err);
    });

const users = usersContainer.items;
const notes = notesContainer.items;

export default database;
export { users };
export { notes };
