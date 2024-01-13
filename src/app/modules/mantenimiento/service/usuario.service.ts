import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dominio, urlConstants } from 'src/app/constants/url.constants';
import { UsuarioResponse } from '../models/usuario-response.model';
import { UsuarioRequest } from '../models/usuario-request.model';
import { CrudService } from '../../shared/service/crud.service';
import { GenericFilterRequest } from 'src/app/models/generic-filter-request.model';
import { GenericFilterResponse } from 'src/app/models/generic-filter-response.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<UsuarioRequest, UsuarioResponse> {

  constructor(
    protected http: HttpClient,
  ) {
    super(http, urlConstants.usuario);
  }
  getProfileById(userId: number): Observable<any> {
    const url = `${dominio}api/usuario/${userId}`;  // Ajusta según tu API
    return this.http.get(url);
  }
  // genericFilterView(request: GenericFilterRequest): Observable<GenericFilterResponse<UsuarioResponse>> {
  //   return this._http.post<GenericFilterResponse<UsuarioResponse>>(`${urlConstants.usuario}filter-view`, request);
  // }


  /*METODOS DEL CRUD */
  /*
  
    constructor(
  private _http: HttpClient
  ) { }
  
  
  
  getAll(): Observable<UsuarioResponse[]> {
  // let auth_token = sessionStorage.getItem("token");
  // const jwtHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${auth_token}`
  // })
  // return this._http.get<UsuarioResponse[]>(urlConstants.Usuario,{ headers: jwtHeaders });
  return this._http.get<UsuarioResponse[]>(urlConstants.Usuario);
  }
  create(request: UsuarioRequest): Observable<UsuarioResponse> {
   
  return this._http.post<UsuarioResponse>(urlConstants.Usuario, request);
  }
  update(request: UsuarioRequest): Observable<UsuarioResponse> {
  return this._http.put<UsuarioResponse>(urlConstants.Usuario, request);
  }
  
  delete(id: number): Observable<number> {
  // return this._http.delete<number>(urlConstants.Usuario + id.toString());
  return this._http.delete<number>(`${urlConstants.Usuario}${id}`);
  }
  */
}
