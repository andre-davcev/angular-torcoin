import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RESPONSE_CRYPTOCURRENCY } from './prices.mock';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  protected readonly domain: string = 'https://torcoin-srsnymczxa-uc.a.run.app';

  constructor(private http: HttpClient) { }

  public latest(start: number = 1, limit: number = 5000, convert: string = 'USD'): Observable<any> {
    const url: string = `${this.domain}/prices`;

    return of(RESPONSE_CRYPTOCURRENCY);
    // return this.http.get(url);
  }
}
