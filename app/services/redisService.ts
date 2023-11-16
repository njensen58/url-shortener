import { createClient } from 'redis';

export default class RedisService {
    public client: ReturnType<typeof createClient> | null;
    constructor() {
        this.client = null;
    }

    public createClient() {
        if (!this.client) {
            this.client = createClient();
        }
        return this.client;
    }

    public async connect() {
        await this?.client?.connect();
    }
}