import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@core/auth/data-access';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = (req.url || '').toLowerCase();
    if (url.includes('/api/auth/login') || url.includes('/api/auth/forgot-password') || url.includes('/api/auth/reset-password') || url.includes('/api/auth/refresh-token')) {
      return next.handle(req);
    }

    const token = this.auth.getAccessToken();
    if (!token) return next.handle(req);

    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });

    return next.handle(cloned);
  }
}
