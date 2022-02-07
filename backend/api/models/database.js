import { CosmosClient } from "@azure/cosmos";

const [endpoint, key] = [process.env.COSMOSDB_ENDPOINT, process.env.COSMOSDB_KEY];
const client = new CosmosClient({
    endpoint: endpoint,
    key: key
});

// Get database
const databaseId = process.env.COSMOS_DB_NAME;
const { database } = await client.databases.createIfNotExists({ id: process.env.COSMOSDB_DATABASE})
  .catch(err => {
      console.error('Error getting the database:\n', err);
  });

// Get users container items
const [usersContainerId, notesContainerId] = [process.env.COSMOSDB_USERS_CONTAINER, process.env.COSMOSDB_NOTES_CONTAINER];
const { usersContainer } = await database.containers.createIfNotExists({ id: usersContainerId })
    .catch(err => {
        console.error(err);
    });

// Get notes container items for jotfox
const { notesContainer } = await database.containers.createIfNotExists({ id: notesContainerId })
    .catch(err => {
        console.error(err);
    });

const users = usersContainer.items;
const notes = notesContainer.items;

export default database;
export { users };
export { notes };
