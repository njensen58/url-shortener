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
        const connection = `redis://nate:nsj89=NSJ@${startedContainer.getHost()}:${startedContainer.getMappedPort(6379)}`
        redisClient = createClient(connection)
        jest.spyOn(RedisService.prototype, 'createClient').mockImplementationOnce(() => redisClient)
    })

    afterAll(async () => {
        await startedContainer.stop();
        await redisClient.quit();
    })

    it("returns error if invalid URL provided", async () => {
        const result = await request(app)
            .post("/api")
            .send({ url: "invalid" })
            .set('Accept', 'application/json')

        expect(result.status).toBe(400)
    });

    it("returns error if invalid ALIAS provided", async () => {
        const result = await request(app)
            .post('/api')
            .send({ url: "www.google.com", alias: "bad" })
            .set('Accept', 'application/json')

        expect(result.status).toBe(400)
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
