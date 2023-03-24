import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { JwtServiceService } from '../services/jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.jwtService.getToken();

    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authReq);
    }
    
    return next.handle(req);
  }
}
