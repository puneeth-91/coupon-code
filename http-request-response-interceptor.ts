import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { ConfigurationManagerService } from '../services/configuration-manager.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestResponseInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
      'APIKey': ConfigurationManagerService.settings != undefined ? ConfigurationManagerService.settings.MetlifeServiceAPIKey: '',
      'IntAPIKey': ConfigurationManagerService.settings != undefined ? ConfigurationManagerService.settings.MetlifeServiceIntAPIKey : '',
      'x-api-key': ConfigurationManagerService.settings != undefined ? ConfigurationManagerService.settings.VSPServiceAPIKey : '',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name',
      'Access-Control-Allow-Methods': 'POST,GET,PUT,PATCH,DELETE,OPTIONS'
    };

    const request = req.clone({ setHeaders: headersConfig });
    
    return next.handle(request).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            console.log("api call success :", event);
          }
        },
        error => {
          //logging the http response to browser's console in case of a failuer
          if (error instanceof HttpErrorResponse) {
            if (error.status == 403 || error.status == 401) {
              this.router.navigate(['/index']);
              console.clear();
            }
            console.log("api call error :", error);
          }
        }
      )
    );
  }
}
