import { SharedServiceService } from '../../shared/services/shared-service.service';
import { environment } from '../../../environments/environment';
import { HelperService } from '../../shared/services/helper.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {LoginService} from "../../pages/auth/login/login.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private helperService: HelperService,
              private router: Router,
              private shareServe: SharedServiceService,
              private loginServ:LoginService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headersConfig: any = {};
    if (req.body instanceof FormData) {
      headersConfig = {};
    } else {
      headersConfig = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    const token = this.helperService.getLocalItem('token');

    const token2 = this.helperService.getLocalItem('token2');
    const url = new URL(req.url);
    const isNewBack = environment.urlNewBack.includes(url.host);
    if ((token || token2) && !req.headers.has('authorization')) {
      headersConfig['authorization'] = `Bearer ${isNewBack ? token2 : token}`;
    }
    const request = req.clone({setHeaders: headersConfig});
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse):Observable<HttpEvent<any>> => {
        if (error.status === 401 && request.url.includes(environment.urlNewBack)) {
          // this.helperService.destroyAllItem();
          // this.router.navigate(['auth/login'])
          return this.loginServ.loginNewBack().pipe(
            switchMap((token: any) => {
              this.helperService.setLocalItem('token2', token.BarandSlavik);
              let newAuthRequest: any = {};
              if (request.method === 'GET') {
                const urlSearchParams = new URLSearchParams(request.url.split('?')[1]);
                urlSearchParams.set('passwordToken', token.BarandSlavik);
                const updatedParams = urlSearchParams.toString();
                newAuthRequest = req.clone({
                  url: req.url.split('?')[0] + '?' + updatedParams
                });

              }
              if (request.method === 'POST') {
                const body: any = request.body;
                body.passwordToken = token.BarandSlavik;
                newAuthRequest = request.clone({body});

              }
              return next.handle(newAuthRequest);

            })
          );
        }
        return throwError(() => error);
      }),
    )
  }
}
