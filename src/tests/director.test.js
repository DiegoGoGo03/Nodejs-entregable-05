const request = require("supertest");
const app = require("../app");
const Director = require("../models/Director");

let directorId;

const director = {
  firstName: "Quentin",
  lastName: "Tarantino",
  nationality: "American",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Quentin_Tarantino_2015.jpg/440px-Quentin_Tarantino_2015.jpg",
  birthday: "1963-03-27",
};

const BASE_URL = '/api/v1/directors';

test("POST '/directors' should return status code 201 and res.body.firstName = director.firstName", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(director);

  directorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

test("GET '/directors' should return status code 200 and an array of directors", async () => {
  const res = await request(app)
    .get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});

test("GET '/directors/:id' should return status code 200 and res.body.firstName = director.firstName", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${directorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

test("PUT '/directors/:id' should return status code 200 and res.body.firstName = directorUpdate.firstName", async () => {
  const directorUpdate = {
    firstName: "Quentin",
    lastName: "Tarantino",
    nationality: "American",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Quentin_Tarantino_2015.jpg/440px-Quentin_Tarantino_2015.jpg",
    birthday: "1963-03-27",
  };

  const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(directorUpdate.firstName);
  expect(res.body.lastName).toBe(directorUpdate.lastName);
});

test("DELETE '/directors/:id' should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${directorId}`);

  expect(res.status).toBe(204);
});
