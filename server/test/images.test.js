const app = require("../server");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Image = require("../model/Image");

const request = supertest(app);

describe("images endpoints test", () => {
  let server;

  beforeAll(async () => {
    server = app.listen(8082);
    await Image.deleteMany({});
  });

  afterAll(async () => {
    await Image.deleteMany({});
    mongoose.connection.close();
    server.close();
  });

  it("can get all images", async () => {
    const response = await request.get("/images");

    expect(response.status).toBe(200);
  });

  describe("when the uploaded file is invalid", () => {
    it("cannot upload", async () => {
      const response = await request.post("/images");

      expect(response.status).toBe(500);
    });
  });

  describe("when the uploaded file is valid", () => {
    let id;

    it("can upload an image", async () => {
      const response = await request
        .post("/images")
        .attach("image", `${__dirname}/a.jpg`);

      id = response.body._id;
      expect(response.status).toBe(201);
    });

    it("can get the uploaded image", async () => {
      const response = await request.get(`/images/${id}`);
      expect(response.status).toBe(200);
    });

    it("can delete the uploaded image", async () => {
      const response = await request.delete(`/images/${id}`);
      expect(response.status).toBe(201);
    });
  });
});
