import { IApi } from "@/infrastructure/interfaces/i-api";
import APP_ENVIRONMENT from "../enviroments";

interface ApiResponse<T> {
    data: T;
    error?: string;
}

export class FetchApi implements IApi {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = APP_ENVIRONMENT.API_URL;
    }

    async post<T>(url: string, data: T): Promise<T> {
        const response = await fetch(this.baseUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result: ApiResponse<T> = await response.json();
        return result.data;
    }

    async put<T>(url: string, data: T): Promise<void> {
        await fetch(this.baseUrl + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
    }

    async get<T>(url: string): Promise<T> {
        const response = await fetch(this.baseUrl + url);
        const result: T  = await response.json();
        return result;
    }
}
