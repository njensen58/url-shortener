import express, { NextFunction, Request, Response } from 'express';
import { createClient } from 'redis';
import Config from './config';
import shortenerRouter from './routers/shortenerRouter';

const app = express();
const client = createClient();

app.use(express.json());

app.use("/api", shortenerRouter(client));

const listenPort = (PORT: number) => {
    app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
    );
};

async function start() {
    await client.connect();
    client.on('error', err => console.log('Redis Client Error', err))
    await listenPort(Config.SERVICE_PORT);
};

// Global catch all
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong." });
})

export default {
    start
}