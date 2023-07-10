import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const TOKEN = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    });

    const tokenHeader = req.clone({headers});
    return next.handle(tokenHeader);
  }
  constructor() { }
}
