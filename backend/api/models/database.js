import { CosmosClient } from "@azure/cosmos";

// Initialize the CosmosDB client | Connect to the database
const config = {
    endpoint: process.env.COSMOSDB_ENDPOINT,
    key: process.env.COSMOSDB_KEY
}
const client = new CosmosClient(config);

// Get database response object
const databaseResponse = await client.databases.createIfNotExists({ id: process.env.COSMOSDB_DATABASE})
  .catch(err => {
      console.error('Error getting the database:\n', err);
  });

// Get users container response object
const usersContainerResponse = await databaseResponse.database.containers.createIfNotExists({ id: process.env.COSMOSDB_USERS_CONTAINER })
    .catch(err => {
        console.error(err);
    });

// Get notes container response object
const notesContainerResponse = await databaseResponse.database.containers.createIfNotExists({ id: process.env.COSMOSDB_NOTES_CONTAINER })
    .catch(err => {
        console.error(err);
    });

// Export containers and database
export const users = usersContainerResponse.container;
export const notes = notesContainerResponse.container;
export default databaseResponse.database;
