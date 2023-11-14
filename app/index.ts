import express, { NextFunction, Request, Response } from 'express';
import { createClient } from 'redis';
import { addHttp } from './helpers';
import Config from './config';
import path from 'path';
import shortenerRouter from './routers/shortenerRouter';

const app = express();
const client = createClient();

app.use(express.json());

// Redirect service...
app.use(async (req: Request, res: Response, next: NextFunction) => {
    const requestedSiteKey = req.path.slice(1);
    if (requestedSiteKey.length >= 5) {
        const redirectTo = await client.get(requestedSiteKey);
        if (!!redirectTo) {
            return res.redirect(301, addHttp(redirectTo))
        } else {
            return res.status(404).json('')
        }
    }
    next();
})

app.use(express.static(path.join(__dirname, "..", "..", "client", "dist", "index.html")))

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