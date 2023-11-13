import express, { Request, Response } from 'express';

import { createClient } from 'redis';
import Config from './config';


const app = express();
const client = createClient()

app.use(express.json());


app.use("/api", async (req: Request, res: Response) => {
    const longUrl = req?.body?.url;

    // #TODO:  if not valid url, return an ERROR here


    // await client.set('key', 'value');
    // const value = await client.get('key');

    const response = {
        key: "",
        long_url: longUrl,
        short_url: ""
    }

    res.json(response);
})

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

export default {
    start
}