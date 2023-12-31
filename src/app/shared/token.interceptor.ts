import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token: string | null = localStorage.getItem('token');

    const cloneReq = request.clone({
      headers: request.headers.set(
        'Authorization',
        token != null ? token : ''
      )
    });

    if (request.url.includes('http://localhost:3000') && !request.url.includes('/login')) {
      request = cloneReq
    }

    if (request.url.includes('http://blabla.com') && !request.url.includes('/login')) {
      request = cloneReq
    }

    return next.handle(request);
  }
}
