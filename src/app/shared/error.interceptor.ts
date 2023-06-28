import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MessageService } from './services/message.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private messageSvc: MessageService, private route: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request)
    return next.handle(request)// continuer ton chemin la requête 
      // > soit vers le prochain interceptor
      // > soit vers le backend
      .pipe(
        tap({
          error: (err) => {
            console.log(err)
            if (err instanceof HttpErrorResponse) {
              switch (err.status) {
                case 401:
                  this.messageSvc.show(`Vous n'êtes pas authentifié(e)`);
                  this.route.navigate(['/login']);
                  break;
                case 403:
                  this.messageSvc.show(`Vous n'êtes pas autorisé(e)`)
                  break;
                case 404:
                  this.messageSvc.show(`La ressource n'est pas disponible`)
                  break;
                case 419:
                  this.messageSvc.show(`Limit rate API}`)
                  break;

                default:
                  this.messageSvc.show("Erreur serveur")
              }
            }

          },
        })
      )
  }

}

