import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { MessageService } from './message.service';

interface Credentials {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER_SERVER = environment.USER_SERVER
  constructor(
    private http: HttpClient,
    private messageSvc: MessageService) { }

  /*
  
  */
  login(credentials: Credentials): Observable<any> {
    let endpoint = '/users/login'
    return this.http.post(this.USER_SERVER + endpoint, credentials)
      // On peut traiter les erreurs HTTP dans un pipe
      // avec catchError() et throwError()
      .pipe(
        // catchError((err: any): Observable<any> => {
        //   return throwError(() => {
        //     console.log('erreur dans le throwError', err)
        //     if (err instanceof HttpErrorResponse) {
        //       switch (err.status) {
        //         case 400:
        //           console.log('Erreur Status :  400')
        //           new Error('Email et MDP ne correspondent pas')
        //           break;
        //         case 500:
        //           console.log('Erreur Status :  500')
        //           new Error('Erreur serveur')
        //           break;
        //       }
        //     }
        //   })
        // })
        tap({
          error: (err: unknown) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status == 400) {
                console.log('dans tap() : ', err);
                // alert('Mauvais Email ou MPD');
                this.messageSvc.show('Mauvais Email ou MPD');
                localStorage.removeItem('token')
              }
            }
          },
        })


      )
  }

  register() {

  }

}

