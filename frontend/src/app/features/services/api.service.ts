import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Organization } from '../types/organization';
import { RegionalOffice } from '../types/regional-office';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOrganizations(): Observable<Organization[]> {
    return this.http
      .get<Organization[]>(`${this.apiUrl}/organizations`)
      .pipe(catchError(this.handleError));
  }

  createOrganization(name: string): Observable<Organization> {
    return this.http
      .post<Organization>(`${this.apiUrl}/organizations`, { name })
      .pipe(catchError(this.handleError));
  }

  getRegionalOffices(organizationId: string): Observable<RegionalOffice[]> {
    return this.http
      .get<RegionalOffice[]>(
        `${this.apiUrl}/regional-offices/${organizationId}`
      )
      .pipe(catchError(this.handleError));
  }

  createRegionalOffice(
    office: Partial<RegionalOffice>
  ): Observable<RegionalOffice> {
    return this.http
      .post<RegionalOffice>(`${this.apiUrl}/regional-offices`, office)
      .pipe(catchError(this.handleError));
  }

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
