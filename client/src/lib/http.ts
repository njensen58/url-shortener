interface HttpResponse<T> {
    data?: T;
    error?: string;
    status: number;
}

export interface SuccessData {
    key: string;
    long_url: string;
    short_url: string;
}

interface ClientRequestBody {
    url: string;
    alias?: string;
}

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export default class HttpRequest {
    private headers = {
        "Content-Type": "application/json"
    }

    constructor(
        private method: HttpMethod,
        private url: string,
        private body?: ClientRequestBody
    ) { }

    async request(): Promise<HttpResponse<SuccessData>> {
        const result = await fetch(
            this.url,
            {
                headers: this.headers,
                method: this.method,
                body: JSON.stringify(this.body)
            }
        )
        const status = result.status;
        const data = await result.json();

        if (!data.error) {
            return {
                data: {
                    long_url: data.long_url,
                    short_url: data.short_url,
                    key: data.key
                },
                status
            }
        } else {
            throw new Error(data.error)
        }
    }
}