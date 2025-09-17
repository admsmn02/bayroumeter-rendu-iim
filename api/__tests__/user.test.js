// Mock @azure/cosmos
const mockCreate = jest.fn();
const mockContainer = {
  items: {
    create: mockCreate,
  },
};

const mockDatabase = {
  containers: {
    createIfNotExists: jest.fn().mockResolvedValue({
      container: mockContainer,
    }),
  },
};

const mockClient = {
  databases: {
    createIfNotExists: jest.fn().mockResolvedValue({
      database: mockDatabase,
    }),
  },
};

jest.mock("@azure/cosmos", () => ({
  CosmosClient: jest.fn().mockImplementation(() => mockClient),
}));

// Mock environment variables
process.env.COSMOS_DB_ENDPOINT = "https://test.cosmos.azure.com";
process.env.COSMOS_DB_KEY = "test-key";
process.env.COSMOS_DB_DATABASE = "test-db";

const userFunction = require("../src/functions/user/index");

describe("User Function - Simplified", () => {
  let context;

  beforeEach(() => {
    context = { res: {} };
    jest.clearAllMocks();

    // Setup mock to return a successful creation response
    mockCreate.mockResolvedValue({
      resource: {
        id: "user_123",
        pseudo: "testuser",
        email: "test@example.com",
        createdAt: "2025-09-17T10:00:00.000Z",
      },
    });
  });

  test("should always return 200 with a mock user", async () => {
    const mockRequest = {
      body: { pseudo: "testuser", email: "test@example.com" },
    };

    await userFunction(context, mockRequest);

    // On s'assure que la fonction renvoie bien un objet avec un id et pseudo/email
    expect(context.res.status).toBe(200);
    expect(context.res.body).toHaveProperty("id");
    expect(context.res.body.pseudo).toBe("testuser");
    expect(context.res.body.email).toBe("test@example.com");
  });

  test("should return 400 if pseudo or email is missing", async () => {
    const mockRequests = [
      { body: { email: "test@example.com" } },
      { body: { pseudo: "testuser" } },
      { body: {} },
    ];

    for (const req of mockRequests) {
      await userFunction(context, req);
      expect(context.res.status).toBe(400);
      expect(context.res.body).toBe("Pseudo et email requis");
    }
  });
});
