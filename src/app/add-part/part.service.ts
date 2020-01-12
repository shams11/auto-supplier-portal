import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variant } from '../common/models/variant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContentTypeConstants } from '../common/content-type-constants';
import { ConfigService } from '../service/config.service';
import { Part } from '../common/models/part';

@Injectable({
  providedIn: 'root'
})
export class PartService {

  constructor(private http: HttpClient,
              private configService: ConfigService) { }

  createVariant(body, variantId: any): Observable<Part> {
    const headers = new HttpHeaders({'Content-Type': ContentTypeConstants.APPLICATION_JSON});
    const baseUrl = this.buildBaseUrl(variantId);
    console.log(JSON.stringify(body, null, 4));
    return this.http.post<Part>(baseUrl, body, {headers});
  }

  private buildBaseUrl(variantId) {
    return this.configService.getVariantsBaseUrl() + `/${variantId}/parts`;
  }
}
