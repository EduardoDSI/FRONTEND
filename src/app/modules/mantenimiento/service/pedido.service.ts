import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constants/url.constants';
import { PedidoResponse } from '../models/pedido-response.model';
import { PedidoRequest } from '../models/pedido-request.model';
import { CrudService } from '../../shared/service/crud.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends CrudService<PedidoRequest, PedidoResponse> {

    constructor(
      protected http: HttpClient,
    ) {
      super(http, urlConstants.pedido);
    }
}