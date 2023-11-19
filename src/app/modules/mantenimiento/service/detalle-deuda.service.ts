import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from 'src/app/constants/url.constants';
import { CrudService } from '../../shared/service/crud.service';
import { DetalleDeudaRequest } from '../models/detalle-deuda-request.model';
import { DetalleDeudaResponse } from '../models/detalle-deuda-response.model';

@Injectable({
  providedIn: 'root'
})
export class DetalleDeudaService extends CrudService<DetalleDeudaRequest, DetalleDeudaResponse> {

  constructor(
    protected http: HttpClient,
  ) {
    super(http, urlConstants.detalleDeuda);
  }
}
