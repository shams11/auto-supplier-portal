import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '../service/config.service';
import { Variant } from '../common/models/variant';
import { ContentTypeConstants } from '../common/content-type-constants';

@Injectable({
  providedIn: 'root'
})
export class VariantService {

  constructor(private http: HttpClient,
              private configService: ConfigService) { }

    createVariant(body, modelId): Observable<Variant> {
      const headers = new HttpHeaders({'Content-Type': ContentTypeConstants.APPLICATION_JSON});
      const baseUrl = this.buildBaseUrl(modelId);
      console.log(JSON.stringify(body, null, 4));
      return this.http.post<Variant>(baseUrl, body, {headers});
    }

  private buildBaseUrl(modelId) {
    return this.configService.getModelsBaseUrl() + `/${modelId}/variants`;
  }
}
