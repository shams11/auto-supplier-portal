import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    static loginUrl = 'login';

    constructor() {
    }

    public getLoginUrl(): string {
        return 'http://localhost:9090/v1/login';
    }

    public getUsersUrl(): string {
        return 'http://localhost:9090/v1/users';
    }

    public getBrandsBaseUrl(): string {
        return 'http://localhost:9090/v1/brands';
    }

    getModelsBaseUrl() {
        return 'http://localhost:9090/v1/models';
    }

    getVariantsBaseUrl() {
        return 'http://localhost:9090/v1/variants';
    }
}
