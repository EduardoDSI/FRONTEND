import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/constants/url.constants';
import { CrudService } from '../../shared/service/crud.service';
import { DeudaRequest } from '../models/deuda-request.model';
import { DeudaResponse } from '../models/deuda-response.model';

@Injectable({
  providedIn: 'root'
})
export class DeudaService extends CrudService<DeudaRequest, DeudaResponse> {

  constructor(
    protected http: HttpClient,
  ) {
    super(http, urlConstants.deuda);
  }
}