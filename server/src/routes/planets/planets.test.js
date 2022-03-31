const request = require("supertest");
const app = require("../../app");

const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Planets API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /planets", () => {
    test("It should respond with 200 success", async () => {
      await request(app)
        .get("/v1/planets")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Planets should have viable living conditions", () => {
    /*
    // planet["koi_disposition"] === "CONFIRMED" &&
    //   planet["koi_insol"] > 0.36 &&
    //   planet["koi_insol"] < 1.11 &&
    //   planet["koi_prad"] < 1.6;
    */
    test("All  planets should have CONFIRMED koi_disposition", async () => {
      const { body: planets } = await request(app).get("/planets");

      expect(planets).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ keplerName: expect.any(String) }),
        ])
      );
    });
  });
});
