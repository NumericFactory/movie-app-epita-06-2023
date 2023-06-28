import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CommentService {

  SERVER_API = environment.USER_SERVER

  constructor(private http: HttpClient) { }

  postComment(data: any): Observable<any> {
    let endpoint = '/comments'
    return this.http.post(this.SERVER_API + endpoint, data);
  }

}
