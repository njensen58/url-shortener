import express, { NextFunction, Request, Response } from 'express';
import { addHttp } from './helpers';
import Config from './config';
import path from 'path';
import shortenerRouter from './routers/shortenerRouter';
import RedisService from './services/redisService';

export const app = express();
const redisService = new RedisService();
const client = redisService.createClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redirect middleware...
app.use(async (req: Request, res: Response, next: NextFunction) => {
    const requestedSiteKey = req.path.slice(1);
    if (requestedSiteKey.length >= 5) {
        const redirectTo = await client.get(requestedSiteKey);
        if (!!redirectTo) {
            // #TODO: Should be a 302?
            return res.redirect(301, addHttp(redirectTo))
        } else {
            return res.status(404).json('')
        }
    }
    next();
})

app.use(express.static(path.join(__dirname, "..", "..", "client", "dist", "index.html")))

app.use("/api", shortenerRouter(client));

// Global catch all
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong." });
})

async function start() {
    await redisService.connect();
    client.on('error', err => console.log('Redis Client Error', err))
    app.listen(Config.SERVICE_PORT, () =>
        console.log(`Server running on http://localhost:${Config.SERVICE_PORT}`)
    );
};

export default { start }