import { HttpClient, HttpErrorResponse, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.url
  }

  formatErrors(error: HttpErrorResponse) {
    console.log(error)
    if (error.status === 0) {
      alert('Network error');
    } else {
      /*alert(error.error.data);*/
    }
    if(error.status === 400){
      alert(error.error.data)
    }
    // Email or password is incorrect
    if(error.status === 401){
      alert(error.error.message)
    }
    return throwError(() => error);
  }
  getOptions(options: any): Object {
    return options;
  }
  get<T>(path: string, params: HttpParamsOptions = {}, otherSettings: any = {}): Observable<T> {
    return this.http.get<T>(
      `${this.apiUrl}/${path}`,
      { params, ...otherSettings } as Object
    );
  }

  put<T>(path: string, body: any = {}, params: any = {}): Observable<T> {
    return this.http.put<T>(
      `${this.apiUrl}/${path}`,
      body || {},
      params as Object
    ).pipe(catchError(this.formatErrors));

  }

  post<T>(path: string, body: any = {}, params: any = {}): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}/${path}`,
      body,
      params as Object
    ).pipe(catchError(this.formatErrors));
  }
  postFile<T>(path: string, body: any = {}, params: any = {}): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}/${path}`,
      body,
      params as Object
    ).pipe(catchError(this.formatErrors));
  }
  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(
      `${this.apiUrl}/${path}`
    ).pipe(catchError(this.formatErrors));
  }

  getCustomUrl(url: string): Observable<any> {
    return this.http.get(url).pipe(catchError(this.formatErrors));
  }
  postCustomUrl<T>(path: string, body: any = {}, params: any = {}): Observable<T> {
    return this.http.post<T>(
      `${path}`,
      body,
      params as Object
    ).pipe(catchError(this.formatErrors));
  }
}
