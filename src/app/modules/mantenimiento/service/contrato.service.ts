import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/constants/url.constants';
import { CrudService } from '../../shared/service/crud.service';
import { ContratoRequest } from '../models/contrato-request.model';
import { ContratoResponse } from '../models/contrato-response.model';

@Injectable({
  providedIn: 'root'
})
export class ContratoService extends CrudService<ContratoRequest, ContratoResponse> {

  constructor(
    protected http: HttpClient,
  ) {
    super(http, urlConstants.contrato);
  }
}