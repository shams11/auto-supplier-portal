import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../service/config.service';
import { Observable } from 'rxjs';
import { Model } from '../common/models/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient,
              private configService: ConfigService) { }

  createModel(formData, body): Observable<any> {
    return this.http.post<any>(this.configService.getBrandsBaseUrl() + `/${formData.brand}/models?name=${formData.name}`, body, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getAllModelsByBrand(brandId: string): Observable<Model> {
    return this.http.get<Model>(this.configService.getModelsBaseUrl() + `?brandId=${brandId}`);
  }
}
