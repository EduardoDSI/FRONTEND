import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constants/url.constants';
import { PersonaResponse } from '../../../models/persona-response.model';
import { PersonaRequest } from '../models/persona-request.model';
import { CrudService } from '../../shared/service/crud.service';
import { ApisPeruPersonaResponse } from '../models/apis-peru-persona-response';

@Injectable({
  providedIn: 'root'
})
export class PersonaService extends CrudService<PersonaRequest, PersonaResponse> {

  constructor(
    protected http: HttpClient,
  ) {
    super(http, urlConstants.persona);
  }

  getProfileById(userId: number): Observable<any> {
    const url = `${urlConstants.persona}${userId}`;
    return this.http.get(url);
  }

  updateProfile(userId: number, personaData: any): Observable<any> {
    const url = `${urlConstants.persona}${userId}`;
    return this.http.put(url, personaData);
  }

  obtenerInformacionPorIdentificacion(tipo: 'dni' | 'ruc', numeroIdentificacion: string): Observable<ApisPeruPersonaResponse> {
    const url = `${urlConstants.persona}dni/${tipo}/${numeroIdentificacion}`;
    return this.http.get<ApisPeruPersonaResponse>(url);
}

}
