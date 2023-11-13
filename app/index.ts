import express, { Request, Response } from 'express';

import { createClient } from 'redis';
import Config from './config';


const app = express();
const client = createClient()


app.use("/api", async (req: Request, res: Response) => {
    await client.set('key', 'value');
    const value = await client.get('key');
    res.json(value);
})

const listenPort = (PORT: number) => {
    app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
    );
};

async function start() {
    await client.connect();
    client.on('error', err => console.log('Redis Client Error', err))

    await app.use(express.json());
    await listenPort(Config.SERVICE_PORT);
};

export default {
    start
}