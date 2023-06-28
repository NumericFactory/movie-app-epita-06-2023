import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

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
  }

  register() {

  }

}

