const request = require('supertest');
const { app } = require('../index.ts');
const { createClient } = require('redis');
import RedisService from "../services/redisService";
import {
    GenericContainer,
    StartedTestContainer,
    TestContainer
} from "testcontainers";

describe("Server", () => {
    const container: TestContainer = new GenericContainer("redis").withExposedPorts(6379);
    let startedContainer: StartedTestContainer;
    let redisClient: ReturnType<typeof createClient>;

    beforeAll(async () => {
        startedContainer = await container.start();
        redisClient = createClient(startedContainer.getMappedPort(6379), startedContainer.getHost())
        jest.spyOn(RedisService.prototype, 'createClient').mockImplementationOnce(() => redisClient)
    })

    afterAll(async () => {
        await startedContainer.stop();
        await redisClient.quit();
    })

    it("returns error if invalid URL provided", (done) => {
        request(app)
            .post('/api')
            .send({ url: "invalid" })
            .set('Accept', 'application/json')
            .expect(400)
            .end(function (err: any, res: any) {
                if (err) return done(err);

                return done();
            })
    });

    it("returns error if invalid ALIAS provided", (done) => {
        request(app)
            .post('/api')
            .send({ url: "www.google.com", alias: "bad" })
            .set('Accept', 'application/json')
            .expect(400)
            .end(function (err: any, res: any) {
                if (err) return done(err);
                return done();
            })
    });

    it("returns alias short if valid alias and no collision", async () => {
        const result = await request(app)
            .post("/api")
            .send({ url: "www.google.com", alias: "gooder" })
            .set('Accept', 'application/json');

    });

    // #TODO: Not passing, seems to be the redis mock client is not being
    // overwritten in time when `app` is loaded

    // it("returns error if alias is taken", async () => {
    //     const result = await request(app)
    //         .post('/api')
    //         .send({ url: "www.yahoo.com", alias: "gooder" })
    //         .set('Accept', 'application/json')
    //     expect(result.status).toBe(500)
    // });
})
