import express, { Request, Response } from 'express';
import ShortenerService from '../services/shortenerService';
import { createClient } from 'redis';
import validator from 'validator';

const shortenerRouter = express.Router();

export default (reddisClient: ReturnType<typeof createClient>) => {
    const shortenerService = new ShortenerService(reddisClient);

    shortenerRouter.post("/", async (req: Request, res: Response) => {
        const longUrl = req?.body?.url;
        const alias = req?.body?.alias;

        // HANDLE ERRORS
        if (!validator.isURL(longUrl)) {
            return res.status(400).json({ error: "Please provide a valid URL" });
        }

        if (alias && alias.length < 5) {
            return res.status(400).json({ error: "Alias must be at least 5 alphanumeric characters." });
        }

        // HANDLE SHORTENING WITH ALIAS
        if (alias && alias.length >= 5) {
            const result = await shortenerService.createAliasShortUrl(longUrl, alias);
            if (result?.error) return res.status(result.status).json({ error: result.error });
            if (result?.data) return res.status(result.status).json(result.data);
        }

        // HANDLE SHORTENING WITH HASH
        const result = await shortenerService.createShortUrl(longUrl);
        if (result?.error) return res.status(result.status).json({ error: result.error });
        return res.status(result.status).json(result.data);
    });


    return shortenerRouter
}
