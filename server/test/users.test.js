const app = require("../server");
const supertest = require("supertest");
const mongoose = require("mongoose");
const User = require("../model/User");

const request = supertest(app);

describe("users endpoints test", () => {
  let server;

  beforeAll(async () => {
    server = app.listen(8081);
    await User.deleteMany({});
  });

  afterAll((done) => {
    await User.deleteMany({});
    mongoose.connection.close();
    server.close(done);
  });

  it("cannot access private routes without jwt token", async () => {
    const response = await request.get("/users/1/images");

    expect(response.status).toBe(401);
  });

  describe("when user registration input is invalid", () => {
    it("cannot register", async () => {
      const response = await request.post("/users/register");

      expect(response.status).toBe(400);
    });
  });

  describe("when user registration input is valid", () => {
    it("can register", async () => {
      const response = await request.post("/users/register").send({
        name: "a b",
        email: "test@gmail.com",
        password: "qweasd",
        password2: "qweasd",
      });

      expect(response.status).toBe(200);
    });

    describe("when user login input is invalid", () => {
      it("cannot log in", async () => {
        const response = await request.post("/users/login").send({
          email: "test@gmail.com",
          password: "qweasd123",
        });

        expect(response.status).toBe(400);
      });
    });

    describe("when user login input is invalid", () => {
      it("can log in", async () => {
        const response = await request.post("/users/login").send({
          email: "test@gmail.com",
          password: "qweasd",
        });

        expect(response.status).toBe(200);
      });
    });
  });
});
