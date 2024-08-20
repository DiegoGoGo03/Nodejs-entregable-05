const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

let movieId;

const movieData = {
    name: "Inception",
    image: "https://image.tmdb.org/t/p/original/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseYear: "2010"
};

const BASE_URL = '/api/v1/movies';

beforeAll(async () => {
    // Crear película antes de ejecutar las pruebas
    const res = await request(app)
        .post(BASE_URL)
        .send(movieData);
    movieId = res.body.id;
});

test("GET '/movies' should return status code 200 and an array of movies", async () => {
    const res = await request(app).get(BASE_URL);
    
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
});

test("GET '/movies/:id' should return status code 200, res.body to be defined and res.body.name === movie.name", async () => {
    const res = await request(app).get(`${BASE_URL}/${movieId}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(movieData.name);
});

test("POST '/movies/:id/actors' should return status code 200, and res.body.length === 1", async () => {
    const createActor = await request(app).post('/api/v1/actors').send({
        firstName: "Leonardo",
        lastName: "DiCaprio",
        nationality: "American",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Leonardo_DiCaprio_October_2016.jpg",
        birthday: "1974-11-11"
    });

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/actors`)
        .send([createActor.body.id]);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
    expect(res.body[0].id).toBeDefined();
});

test("PUT '/movies/:id' should return status code 200 and res.body.name === updatedMovie.name", async () => {
    const updatedMovie = {
        name: "Inception Updated",
        image: movieData.image,
        synopsis: movieData.synopsis,
        releaseYear: movieData.releaseYear
    };

    const res = await request(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(updatedMovie);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(updatedMovie.name);
});

test("DELETE '/movies/:id' should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${movieId}`);

    expect(res.status).toBe(204);
});
