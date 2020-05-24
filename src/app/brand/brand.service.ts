import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../service/config.service';
import {Brand} from '../common/models/brand';

@Injectable({
    providedIn: 'root'
})
export class BrandService {

    constructor(private http: HttpClient,
                private configService: ConfigService) {
    }

  createBrand(formData, body): Observable<any> {
    return this.http.post<any>(this.configService.getBrandsBaseUrl() + `?name=${formData.name}`, body);
  }

    getAllBrandsByOrg(orgId: string): Observable<Brand> {
        return this.http.get<Brand>(this.configService.getBrandsBaseUrl() + `?orgId=${orgId}`);
    }
}
