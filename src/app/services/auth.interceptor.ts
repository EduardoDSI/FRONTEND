import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { alert_error } from '../functions/general.functions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = sessionStorage.getItem("token");
    //puedo obtener otras variables



    let request = req;
    if (token) {
      request = req.clone(
        {
          setHeaders: {
            authorization: `Bearer ${token}`
          }
        });
    }

    return next.handle(request);



  }
}
