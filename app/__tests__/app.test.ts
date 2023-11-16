const request = require('supertest');
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
        const connection = `redis://:@${startedContainer.getHost()}:${startedContainer.getMappedPort(6379)}`
        redisClient = createClient(connection)
        jest.spyOn(RedisService.prototype, 'createClient').mockImplementationOnce(() => redisClient)
        await redisClient.connect();
    })

    afterAll(async () => {
        await startedContainer.stop();
        await redisClient.quit();
    })

    afterEach(async () => {
        redisClient && await redisClient.sendCommand(["FLUSHALL"]);
    })

    it("returns error if invalid URL provided", async () => {
        const { app } = require('../index.ts');
        const result = await request(app)
            .post("/api")
            .send({ url: "invalid" })
            .set('Accept', 'application/json')

        expect(result.status).toBe(400)
    });

    it("returns error if invalid ALIAS provided", async () => {
        const { app } = require('../index.ts');
        const result = await request(app)
            .post('/api')
            .send({ url: "www.google.com", alias: "bad" })
            .set('Accept', 'application/json')

        expect(result.status).toBe(400)
    });

    it("returns alias short if valid alias and no collision", async () => {
        const { app } = require('../index.ts');
        const result = await request(app)
            .post("/api")
            .send({ url: "www.google.com", alias: "gooder" })
            .set('Accept', 'application/json');
        expect(result.status).toBe(201)
    });

    it("returns error if alias is taken", async () => {
        const { app } = require('../index.ts');
        await redisClient.set("gooder", "www.google.com")
        const result = await request(app)
            .post('/api')
            .send({ url: "www.yahoo.com", alias: "gooder" })
            .set('Accept', 'application/json')
        expect(result.status).toBe(500)
    });

    it("returns new short url given valid long url", async () => {
        const { app } = require('../index.ts');
        const result = await request(app)
            .post('/api')
            .send({ url: "www.hotmail.com", alias: "" })
            .set('Accept', 'application/json')
        expect(result.status).toBe(201)
        expect(result.body.short_url).toBeDefined()
        expect(result.body.key).toBeDefined()
    });
})
