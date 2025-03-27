import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseAPIService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Generic method for GET requests
  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http
      .get<T>(`${this.apiUrl}${url}`, { params })
      .pipe(catchError(this.handleError));
  }

  // Generic method for POST requests
  post<T>(
    url: string,
    body: any,
    config?: {
      customURL?: string;
      headers?: Record<string, string>;
    }
  ): Observable<T> {
    const headers = config?.headers ?? {};
    return this.http
      .post<T>(config?.customURL ?? `${this.apiUrl}${url}`, body, headers)
      .pipe(catchError(this.handleError));
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
