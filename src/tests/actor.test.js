require('../models')

const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");

let actorId

const actor = {
  firstName: "Jeremy",
  lastName: "Renner",
  nationality: "American",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Jeremy_Renner_2010.jpg/440px-Jeremy_Renner_2010.jpg",
  birthday: "1971-01-07",
};

const BASE_URL = '/api/v1/actors';

test("POST '/actors' should return status code 201 and res.body.firstName = actor.firstName", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(actor);

  actorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test("GET '/actors' should return status code 200 and an array of actors", async () => {
  const res = await request(app)
    .get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});

test("GET '/actors/:id' should return status code 200 and res.body.firstName = actor.firstName", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${actorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test("PUT '/actors/:id' should return status code 200 and res.body.firstName = actorUpdate.firstName", async () => {
  const actorUpdate = {
    firstName: "Jeremy",
    lastName: "Renner",
    nationality: "American",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Jeremy_Renner_2010.jpg/440px-Jeremy_Renner_2010.jpg",
    birthday: "1971-01-07",
  };

  const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actorUpdate.firstName);
  expect(res.body.lastName).toBe(actorUpdate.lastName);
});

test("DELETE '/actors/:id' should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`);

  expect(res.status).toBe(204);
});
