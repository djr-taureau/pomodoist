import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';
import { Pomo } from './pomo.model';

const BASE_URL = 'https://api.mongolab.com/api/1/databases/pomodoist/collections';
const apiKey = 'KMf8fEu_Yw2AxXSYeTTMAyJu2m6zTLJi';
const POMOS = '/tasks';
const params = '?apiKey=' + apiKey;
const FULL_URL = BASE_URL + POMOS + params;
const HEADER = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({providedIn: 'root'})
export class PomosService {
  constructor(private http: HttpClient) {
  }

  all(): Observable<Pomo[]> {
    return this.http.get<Pomo[]>(BASE_URL + '/pomos' + params)
    .pipe(catchError(this.handleError('all', [])));
  }


  load(id) {
    return this.http.get(`${FULL_URL}${id}`);
  }

  create(pomo: Pomo) {
    return this.http.post(`${FULL_URL}`, JSON.stringify(pomo), HEADER);
  }

  update(pomo: Pomo) {
    return this.http.patch(`${FULL_URL}${pomo.id}`, JSON.stringify(pomo), HEADER);
  }

  delete(pomo: Pomo) {
    return this.http.delete(`${FULL_URL}${pomo.id}`);
  }

  search(term: string) {
    const params = new HttpParams();
    params.set('q', term);

    return this.http.get(`${BASE_URL}`, {params});
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status === 404) {
        console.log('HTTP 404 Not found error');
        return of(result as T);
      } else {
        console.error(error);
        return _throw('An error occurred:', error.error.message);
      }
    };
  }
}
