import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import {BrandService} from '../brand/brand.service';
import {Brand} from '../common/models/brand';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,
              private configService: ConfigService) { }

  getImage(id: string): Observable<Blob> {
    const brandImageUrl = this.configService.getBrandsBaseUrl() + `/image/${id}`;
    return this.http.get(brandImageUrl, {responseType: 'blob'});
  }

  getAllBrandsByOrg(orgId: string): Observable<Brand> {
    return this.http.get<Brand>(this.configService.getBrandsBaseUrl() + `?orgId=${orgId}`);
  }
}
