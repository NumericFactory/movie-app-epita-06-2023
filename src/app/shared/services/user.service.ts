import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';

interface Credentials {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER_SERVER = environment.USER_SERVER
  constructor(private http: HttpClient) { }

  /*
  
  */
  login(credentials: Credentials): Observable<any> {
    let endpoint = '/users/login'
    return this.http.post(this.USER_SERVER + endpoint, credentials)
      // On peut traiter les erreurs HTTP dans un pipe
      .pipe(
        catchError((err: any): Observable<any> => {

          return throwError(() => {
            console.log('erreur dans le throwError', err)
            if (err instanceof HttpErrorResponse) {
              switch (err.status) {
                case 400:
                  console.log('Erreur Status :  400')
                  new Error('Email ou password Invalide')
                  break;
                case 500:
                  console.log('Erreur Status :  500')
                  new Error('Erreur serveur')
                  break;
              }
            }


          })
        })
      )
  }

  register() {

  }

}

