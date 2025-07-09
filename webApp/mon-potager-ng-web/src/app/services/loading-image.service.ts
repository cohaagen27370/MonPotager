import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingImageService {
  constructor(
    private readonly http: HttpClient,
    @Inject('BASE_API_URL') public apiUrl: string,
  ) {}

  loadingFile(image: File, name: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', image, image.name);

    const headers = new HttpHeaders().append(
      'Content-Disposition',
      'mulipart/form-data',
    );

    return this.http
      .post(`${this.apiUrl}/v1/admin/photo?name=${name}`, formData, {
        reportProgress: true,
        observe: 'events',
        headers: headers,
      })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(() => error);
  }
}
