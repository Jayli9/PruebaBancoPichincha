import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { constante } from '../main/pages/productos/constantes/constante';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'authorId': `${constante.authorId}`
      }
    });
    return next.handle(request);
  }

}
