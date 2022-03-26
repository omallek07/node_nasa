const request = require("supertest");
const app = require("../../app");
const { loadPlanetsData } = require("../../models/planets.model.js");

describe("Test GET /planets", () => {
  test("It should respond with 200 success", async () => {
    await request(app)
      .get("/planets")
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

  beforeAll(async () => {
    // Load data from CSV file
    await loadPlanetsData();
  });

  test("All  planets should have CONFIRMED koi_disposition", async () => {
    const { body: planets } = await request(app).get("/planets");

    expect(planets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ koi_disposition: "CONFIRMED" }),
      ])
    );
  });
});
