import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AuthApiService } from '@features/auth/data-access';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessKey = 'access_token';
  private refreshKey = 'refresh_token';
  private avatarKey = 'avatar_url';
  private avatarSubject = new BehaviorSubject<string | null>(localStorage.getItem('avatar_url'));
  avatar$ = this.avatarSubject.asObservable();

  constructor(private http: HttpClient, private api: AuthApiService) {}

  login(username: string, password: string): Observable<any> {
    this.clearTokens();
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
    return this.api.logout({ refreshToken: refresh }).pipe(
      tap(() => this.clearTokens())
    );
  }

  refreshToken(): Observable<any> {
    const token = this.getRefreshToken();
    if (!token) return of(null);
    return this.api.refreshToken({ token }).pipe(
      tap((res: any) => {
        const access = res?.result?.accessToken;
        const refresh = res?.result?.refreshToken;
        if (access) this.setTokens(access, refresh);
      }),
      catchError(() => of(null))
    );
  }

  forgotPassword(username: string): Observable<any> {
    return this.api.forgotPassword({ username });
  }

  resetPassword(username: string, resetCode: string, newPassword: string, confirmPassword?: string): Observable<any> {
    const payload = {
      username,
      resetCode,
      newPassword,
      confirmPassword
    };
    return this.api.resetPassword(payload as any);
  }

  setTokens(access: string, refresh?: string | null) {
    if (access) localStorage.setItem(this.accessKey, access);
    if (refresh) localStorage.setItem(this.refreshKey, refresh);
  }

  setAvatar(url: string | null) {
    if (url) localStorage.setItem(this.avatarKey, url);
    else localStorage.removeItem(this.avatarKey);
    this.avatarSubject.next(url);
  }

  getAvatar(): string | null {
    return localStorage.getItem(this.avatarKey);
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
