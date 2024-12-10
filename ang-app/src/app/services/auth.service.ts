import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Response } from '../models/responce.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000/auth/';

  constructor(private http: HttpClient) { }

  register(userData: User): Observable<Response> {
    return this.http.post<Response>(this.url + "register", userData, { withCredentials: true });
  }
}
