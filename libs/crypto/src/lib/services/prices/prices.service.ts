import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  protected readonly domain: string = 'https://torcoin-srsnymczxa-uc.a.run.app';

  constructor(private http: HttpClient) { }

  public latest(start: number = 1, limit: number = 5000, convert: string = 'USD'): Observable<any> {
    const url: string = `${this.domain}/prices`;

    return this.http.get(url);
  }
}
