import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constants/url.constants';
import { UbigeoResponse } from '../models/ubigeo-response.model';
import { UbigeoRequest } from '../models/ubigeo-request.model';
import { CrudService } from '../../shared/service/crud.service';
import { GenericFilterRequest } from 'src/app/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/models/generic-filter-response.model';


@Injectable({
  providedIn: 'root'
})
export class UbigeoService extends CrudService<UbigeoRequest, UbigeoResponse> {

  constructor(
    protected http: HttpClient,
  ) {
    super(http, urlConstants.ubigeo);
  }
  // genericFilterView(request: GenericFilterRequest): Observable<GenericFilterResponse<UbigeoResponse>> {
  //   return this._http.post<GenericFilterResponse<UbigeoResponse>>(`${urlConstants.ubigeo}filter-view`, request);
  // }


  /*METODOS DEL CRUD */
  /*
  
    constructor(
  private _http: HttpClient
  ) { }
  
  
  
  getAll(): Observable<UbigeoResponse[]> {
  // let auth_token = sessionStorage.getItem("token");
  // const jwtHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${auth_token}`
  // })
  // return this._http.get<UbigeoResponse[]>(urlConstants.Ubigeo,{ headers: jwtHeaders });
  return this._http.get<UbigeoResponse[]>(urlConstants.Ubigeo);
  }
  create(request: UbigeoRequest): Observable<UbigeoResponse> {
   
  return this._http.post<UbigeoResponse>(urlConstants.Ubigeo, request);
  }
  update(request: UbigeoRequest): Observable<UbigeoResponse> {
  return this._http.put<UbigeoResponse>(urlConstants.Ubigeo, request);
  }
  
  delete(id: number): Observable<number> {
  // return this._http.delete<number>(urlConstants.Ubigeo + id.toString());
  return this._http.delete<number>(`${urlConstants.Ubigeo}${id}`);
  }
  */
}
