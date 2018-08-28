import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = 'https://api.mongolab.com/api/1/databases/pomodoist/collections';
const apiKey = 'KMf8fEu_Yw2AxXSYeTTMAyJu2m6zTLJi';
const TASKS = '/users';
const params = '?apiKey=' + apiKey;
const FULL_URL = BASE_URL + TASKS + params;
const HEADER = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get(FULL_URL);
  }
}
//
