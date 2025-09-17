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

const voteFunction = require("../src/functions/vote/index");

// Mock environment variables
process.env.COSMOS_DB_ENDPOINT = "https://test.cosmos.azure.com";
process.env.COSMOS_DB_KEY = "test-key";
process.env.COSMOS_DB_DATABASE = "test-db";

describe("Vote Function", () => {
  let mockContext;

  beforeEach(() => {
    mockContext = {
      res: {},
    };

    // Reset mocks
    jest.clearAllMocks();
  });

  describe("Successful vote creation", () => {
    test("should create a vote with valid userId and choice", async () => {
      // Arrange
      const mockRequest = {
        body: {
          userId: "user_123_abc",
          choice: "oui",
        },
      };

      const mockCreatedVote = {
        id: "vote_456_def",
        userId: "user_123_abc",
        choice: "oui",
        createdAt: "2025-09-17T10:00:00.000Z",
      };

      // Mock the container.items.create method
      mockCreate.mockResolvedValue({ resource: mockCreatedVote });

      // Act
      await voteFunction(mockContext, mockRequest);

      // Assert
      expect(mockContext.res.status).toBe(200);
      expect(mockContext.res.body).toEqual(mockCreatedVote);
    });

    test("should generate unique vote ID", async () => {
      // Arrange
      const mockRequest = {
        body: {
          userId: "user_789_ghi",
          choice: "non",
        },
      };

      let capturedVote;
      mockCreate.mockImplementation((vote) => {
        capturedVote = vote;
        return Promise.resolve({ resource: vote });
      });

      // Act
      await voteFunction(mockContext, mockRequest);

      // Assert
      expect(capturedVote.id).toMatch(/^vote_\d+_[a-z0-9]{9}$/);
      expect(capturedVote.userId).toBe("user_789_ghi");
      expect(capturedVote.choice).toBe("non");
      expect(capturedVote.createdAt).toBeTruthy();
    });

    test("should accept different vote choices", async () => {
      const choices = ["oui", "non", "abstention"];

      for (const choice of choices) {
        // Arrange
        const mockRequest = {
          body: {
            userId: "user_123_abc",
            choice: choice,
          },
        };

        let capturedVote;
        mockCreate.mockImplementation((vote) => {
          capturedVote = vote;
          return Promise.resolve({ resource: vote });
        });

        // Act
        await voteFunction(mockContext, mockRequest);

        // Assert
        expect(capturedVote.choice).toBe(choice);
        expect(mockContext.res.status).toBe(200);
      }
    });
  });

  describe("Validation errors", () => {
    test("should return 400 when userId is missing", async () => {
      // Arrange
      const mockRequest = {
        body: {
          choice: "oui",
        },
      };

      // Act
      await voteFunction(mockContext, mockRequest);

      // Assert
      expect(mockContext.res.status).toBe(400);
      expect(mockContext.res.body).toBe("userId et choice requis");
    });

    test("should return 400 when choice is missing", async () => {
      // Arrange
      const mockRequest = {
        body: {
          userId: "user_123_abc",
        },
      };

      // Act
      await voteFunction(mockContext, mockRequest);

      // Assert
      expect(mockContext.res.status).toBe(400);
      expect(mockContext.res.body).toBe("userId et choice requis");
    });

    test("should return 400 when both userId and choice are missing", async () => {
      // Arrange
      const mockRequest = {
        body: {},
      };

      // Act
      await voteFunction(mockContext, mockRequest);

      // Assert
      expect(mockContext.res.status).toBe(400);
      expect(mockContext.res.body).toBe("userId et choice requis");
    });

    test("should return 400 when userId is empty string", async () => {
      // Arrange
      const mockRequest = {
        body: {
          userId: "",
          choice: "oui",
        },
      };

      // Act
      await voteFunction(mockContext, mockRequest);

      // Assert
      expect(mockContext.res.status).toBe(400);
      expect(mockContext.res.body).toBe("userId et choice requis");
    });

    test("should return 400 when choice is empty string", async () => {
      // Arrange
      const mockRequest = {
        body: {
          userId: "user_123_abc",
          choice: "",
        },
      };

      // Act
      await voteFunction(mockContext, mockRequest);

      // Assert
      expect(mockContext.res.status).toBe(400);
      expect(mockContext.res.body).toBe("userId et choice requis");
    });
  });

  describe("Database errors", () => {
    test("should return 500 when CosmosDB throws an error", async () => {
      // Arrange
      const mockRequest = {
        body: {
          userId: "user_123_abc",
          choice: "oui",
        },
      };

      // Mock database error
      mockClient.databases.createIfNotExists.mockRejectedValue(
        new Error("Database connection failed")
      );

      // Act
      await voteFunction(mockContext, mockRequest);

      // Assert
      expect(mockContext.res.status).toBe(500);
      expect(mockContext.res.body).toBe("Erreur serveur");
    });

    test("should return 500 when vote creation fails", async () => {
      // Arrange
      const mockRequest = {
        body: {
          userId: "user_123_abc",
          choice: "oui",
        },
      };

      // Mock creation error
      mockCreate.mockRejectedValue(new Error("Vote creation failed"));

      // Act
      await voteFunction(mockContext, mockRequest);

      // Assert
      expect(mockContext.res.status).toBe(500);
      expect(mockContext.res.body).toBe("Erreur serveur");
    });
  });
});
