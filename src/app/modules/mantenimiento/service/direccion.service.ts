import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/constants/url.constants';
import { CrudService } from '../../shared/service/crud.service';
import { DireccionRequest } from '../models/direccion-request.model';
import { DireccionResponse } from '../models/direccion-response.model';

@Injectable({
  providedIn: 'root'
})
export class DireccionService extends CrudService<DireccionRequest, DireccionResponse> {

  constructor(
    protected http: HttpClient,
  ) {
    super(http, urlConstants.direccion);
  }
}