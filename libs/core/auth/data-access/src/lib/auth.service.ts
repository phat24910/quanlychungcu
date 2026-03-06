import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AuthApiService } from '@features/auth/data-access';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessKey = 'access_token';
  private refreshKey = 'refresh_token';

  constructor(private http: HttpClient, private api: AuthApiService) {}

  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.api.login(payload).pipe(
      tap((res: any) => {
        const access = res?.result?.accessToken;
        const refresh = res?.result?.refreshToken;
        if (access) this.setTokens(access, refresh);
      })
    );
  }

  logout(): Observable<any> {
    const refresh = this.getRefreshToken();
    const url = `${environment.apiBaseUrl}/api/auth/logout`;
    return this.http.post(url, { refreshToken: refresh }).pipe(
      tap(() => this.clearTokens())
    );
  }

  refreshToken(): Observable<any> {
    const token = this.getRefreshToken();
    if (!token) return of(null);
    const url = `${environment.apiBaseUrl}/api/auth/refresh-token`;
    return this.http.post(url, { token }).pipe(
      tap((res: any) => {
        const access = res?.result?.accessToken;
        const refresh = res?.result?.refreshToken;
        if (access) this.setTokens(access, refresh);
      }),
      catchError(() => of(null))
    );
  }

  setTokens(access: string, refresh?: string | null) {
    if (access) localStorage.setItem(this.accessKey, access);
    if (refresh) localStorage.setItem(this.refreshKey, refresh);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshKey);
  }

  clearTokens() {
    localStorage.removeItem(this.accessKey);
    localStorage.removeItem(this.refreshKey);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
