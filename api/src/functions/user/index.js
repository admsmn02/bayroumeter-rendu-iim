const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_DATABASE;
const containerId = "Users";

const client = new CosmosClient({ endpoint, key });

// Function to ensure database and container exist
async function ensureDatabaseAndContainer() {
  try {
    // Create database if it doesn't exist
    const { database } = await client.databases.createIfNotExists({
      id: databaseId,
    });

    // Create container if it doesn't exist
    const { container } = await database.containers.createIfNotExists({
      id: containerId,
      partitionKey: { paths: ["/id"] },
    });

    return { database, container };
  } catch (error) {
    console.error("Error creating database/container:", error);
    throw error;
  }
}

module.exports = async function (context, req) {
  const { pseudo, email } = req.body;

  if (!pseudo || !email) {
    context.res = { status: 400, body: "Pseudo et email requis" };
    return;
  }

  try {
    // Ensure database and container exist
    const { container } = await ensureDatabaseAndContainer();

    // Create user with an ID for partitioning
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      pseudo,
      email,
      createdAt: new Date().toISOString(),
    };

    const { resource } = await container.items.create(newUser);
    context.res = { status: 200, body: resource };
  } catch (err) {
    console.error("Erreur CosmosDB:", err);
    context.res = { status: 500, body: "Erreur serveur" };
  }
};
