import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { LoginRequest } from './models';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private http: HttpClient) {}

  login(payload: LoginRequest): Observable<unknown> {
    return this.http.post(`${environment.apiBaseUrl}/api/auth/login`, payload);
  }
}
