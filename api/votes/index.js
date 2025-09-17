const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_DATABASE;
const votesContainerId = "Votes";
const usersContainerId = "Users";

const client = new CosmosClient({ endpoint, key });

// Function to ensure database and containers exist
async function ensureDatabaseAndContainers() {
  try {
    // Create database if it doesn't exist
    const { database } = await client.databases.createIfNotExists({
      id: databaseId,
    });

    // Create votes container if it doesn't exist
    const { container: votesContainer } =
      await database.containers.createIfNotExists({
        id: votesContainerId,
        partitionKey: { paths: ["/id"] },
      });

    // Create users container if it doesn't exist
    const { container: usersContainer } =
      await database.containers.createIfNotExists({
        id: usersContainerId,
        partitionKey: { paths: ["/id"] },
      });

    return { database, votesContainer, usersContainer };
  } catch (error) {
    console.error("Error creating database/containers:", error);
    throw error;
  }
}

module.exports = async function (context, req) {
  try {
    // Ensure database and containers exist
    const { votesContainer, usersContainer } =
      await ensureDatabaseAndContainers();

    // Get all votes
    const { resources: votes } = await votesContainer.items
      .query("SELECT * FROM c")
      .fetchAll();

    // Get all users
    const { resources: users } = await usersContainer.items
      .query("SELECT * FROM c")
      .fetchAll();

    // Create a map of userId to username for quick lookup
    const userMap = {};
    users.forEach((user) => {
      userMap[user.id] = user.pseudo;
    });

    // Transform votes to include usernames instead of user IDs
    const votesWithUsernames = votes.map((vote) => ({
      id: vote.id,
      username: userMap[vote.userId] || vote.userId, // fallback to userId if username not found
      choice: vote.choice,
      createdAt: vote.createdAt,
    }));

    context.res = { status: 200, body: votesWithUsernames };
  } catch (err) {
    console.error("Erreur CosmosDB:", err);
    context.res = { status: 500, body: "Erreur serveur" };
  }
};
