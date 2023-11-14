import { md5 } from 'hash-wasm';
import { createClient } from 'redis';

interface IResponse {
    data: {
        long_url: string;
        short_url: string;
        key: string
    } | null;
    error: string | null;
    status: number;
}

// this service handles all hashing and collision managment on requests
// #TODO: Currently this class is doing too much.
class ShortenerService {
    constructor(private reddisClient: ReturnType<typeof createClient>) {
        this.reddisClient = reddisClient;
    }

    private async collisionCheck(longUrl: string, shortUrl: string): Promise<boolean> {
        const existing = await this.reddisClient.get(shortUrl);
        return !!existing && existing !== longUrl;
    }

    private async isIdempotentRequest(longUrl: string, shortUrl: string): Promise<boolean> {
        const existing = await this.reddisClient.get(shortUrl);
        return !!existing && existing === longUrl;
    }


    /**
     * createShortUrl
     * @param longUrl 
     * Processes the checking and creation of a new Short url request.
     * 3 possible outcomes are:
     *   - Dup request -> send existing short url response
     *   - Collision -> explode
     *   - Add new Short -> send new short url response
     */
    public async createShortUrl(longUrl: string): Promise<IResponse> {
        const hash = await md5(longUrl);
        const base64 = btoa(hash);
        const shortUrl = base64.slice(0, 5);

        const isDupReq = await this.isIdempotentRequest(longUrl, shortUrl);
        if (isDupReq) {
            return {
                status: 200,
                error: null,
                data: {
                    key: shortUrl,
                    long_url: longUrl,
                    short_url: `http://localhost/${shortUrl}`
                }
            }
        }


        const collision = await this.collisionCheck(longUrl, shortUrl);

        if (collision) {
            return {
                status: 500,
                error: "Unhandled Collision... sorry",
                data: null
            }
        }

        await this.reddisClient.set(shortUrl, longUrl);

        return {
            status: 201,
            error: null,
            data: {
                key: shortUrl,
                long_url: longUrl,
                short_url: `http://localhost/${shortUrl}`
            }
        }
    }


    /**
     * createAliasShortUrl
     * @param longUrl 
     * @param alias 
     * Processes the checking and creation of a new Short url request.
     * 3 possible outcomes are:
     *   - Dup request -> send existing short url response
     *   - Collision -> Request a new alias from user
     *   - Add new Short -> send new short url response
     */
    public async createAliasShortUrl(longUrl: string, alias: string): Promise<IResponse> {
        const existing = await this.reddisClient.get(alias);
        if (!existing) {
            await this.reddisClient.set(alias, longUrl);
            return {
                status: 201,
                data: {
                    key: alias,
                    long_url: longUrl,
                    short_url: `http://localhost/${alias}`
                },
                error: null
            }
        } else {
            const collision = await this.collisionCheck(longUrl, alias);
            if (collision) {
                // No care for collisions with alias, make em choose another.
                return {
                    status: 500,
                    error: "Please use a different alias.",
                    data: null
                }
            }
        }

        // If it exists and isn't a collision, treat it as a GET and just
        // return the existing url.
        return {
            status: 201,
            data: {
                key: alias,
                long_url: longUrl,
                short_url: `http://localhost/${alias}`
            },
            error: null
        }
    }
}


export default ShortenerService;