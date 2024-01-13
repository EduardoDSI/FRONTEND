import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dominio, urlConstants } from 'src/app/constants/url.constants';
import { RolResponse } from '../../../models/rol-response-model';
import { RolRequest } from '../models/rol-request.model';
import { CrudService } from '../../shared/service/crud.service';

@Injectable({
  providedIn: 'root'
})
export class RolService extends CrudService<RolRequest, RolResponse> {

    constructor(
      protected http: HttpClient,
    ) {
      super(http, urlConstants.rol);
    }
    getProfileById(userId: number): Observable<any> {
        const url = `${dominio}api/rol/${userId}`;  // Ajusta según tu API
        return this.http.get(url);
      }
}