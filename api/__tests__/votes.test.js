const mockVotesQuery = jest.fn();
const mockUsersQuery = jest.fn();

const mockVotesContainer = { items: { query: mockVotesQuery } };
const mockUsersContainer = { items: { query: mockUsersQuery } };
const mockDatabase = { containers: { createIfNotExists: jest.fn() } };
const mockClient = {
  databases: {
    createIfNotExists: jest.fn().mockResolvedValue({ database: mockDatabase }),
  },
};

jest.mock("@azure/cosmos", () => ({
  CosmosClient: jest.fn().mockImplementation(() => mockClient),
}));

const votesFunction = require("../src/functions/votes/index");

process.env.COSMOS_DB_ENDPOINT = "https://test.cosmos.azure.com";
process.env.COSMOS_DB_KEY = "test-key";
process.env.COSMOS_DB_DATABASE = "test-db";

describe("Votes Function - simplified", () => {
  let context;

  beforeEach(() => {
    context = { res: {} };
    jest.clearAllMocks();

    // Setup container creation mocks - need to handle multiple calls properly
    mockDatabase.containers.createIfNotExists
      .mockResolvedValueOnce({ container: mockVotesContainer })
      .mockResolvedValueOnce({ container: mockUsersContainer });

    // Default query returns empty arrays
    mockVotesQuery.mockReturnValue({
      fetchAll: jest.fn().mockResolvedValue({ resources: [] }),
    });
    mockUsersQuery.mockReturnValue({
      fetchAll: jest.fn().mockResolvedValue({ resources: [] }),
    });
  });

  test("should return votes with usernames (empty by default)", async () => {
    await votesFunction(context, {});
    expect(context.res.status).toBe(200);
    expect(context.res.body).toEqual([]);
  });

  test("should map votes to usernames", async () => {
    const votes = [
      {
        id: "v1",
        userId: "u1",
        choice: "oui",
        createdAt: "2025-09-17T10:00:00Z",
      },
    ];
    const users = [{ id: "u1", pseudo: "Alice" }];

    mockVotesQuery.mockReturnValue({
      fetchAll: jest.fn().mockResolvedValue({ resources: votes }),
    });
    mockUsersQuery.mockReturnValue({
      fetchAll: jest.fn().mockResolvedValue({ resources: users }),
    });

    await votesFunction(context, {});
    expect(context.res.status).toBe(200);
    expect(context.res.body).toEqual([
      {
        id: "v1",
        username: "Alice",
        choice: "oui",
        createdAt: "2025-09-17T10:00:00Z",
      },
    ]);
  });

  test("should fallback to userId if username not found", async () => {
    const votes = [
      {
        id: "v1",
        userId: "u2",
        choice: "non",
        createdAt: "2025-09-17T11:00:00Z",
      },
    ];
    const users = [];

    mockVotesQuery.mockReturnValue({
      fetchAll: jest.fn().mockResolvedValue({ resources: votes }),
    });
    mockUsersQuery.mockReturnValue({
      fetchAll: jest.fn().mockResolvedValue({ resources: users }),
    });

    await votesFunction(context, {});
    expect(context.res.status).toBe(200);
    expect(context.res.body).toEqual([
      {
        id: "v1",
        username: "u2",
        choice: "non",
        createdAt: "2025-09-17T11:00:00Z",
      },
    ]);
  });

  test("should return 500 if database creation fails", async () => {
    mockClient.databases.createIfNotExists.mockRejectedValueOnce(
      new Error("DB error")
    );
    await votesFunction(context, {});
    expect(context.res.status).toBe(500);
    expect(context.res.body).toBe("Erreur serveur");
  });

  test("should return 500 if votes query fails", async () => {
    mockVotesQuery.mockReturnValue({
      fetchAll: jest.fn().mockRejectedValue(new Error("Votes query failed")),
    });
    await votesFunction(context, {});
    expect(context.res.status).toBe(500);
    expect(context.res.body).toBe("Erreur serveur");
  });

  test("should return 500 if users query fails", async () => {
    mockUsersQuery.mockReturnValue({
      fetchAll: jest.fn().mockRejectedValue(new Error("Users query failed")),
    });
    await votesFunction(context, {});
    expect(context.res.status).toBe(500);
    expect(context.res.body).toBe("Erreur serveur");
  });
});
