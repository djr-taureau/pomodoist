import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './project.model';
// TODO: needs to point to todoist rest api to pull in projects
const BASE_URL = 'https://api.mongolab.com/api/1/databases/pomodoist/collections';
const apiKey = 'KMf8fEu_Yw2AxXSYeTTMAyJu2m6zTLJi';
const TASKS = '/tasks';
const params = '?apiKey=' + apiKey;
const FULL_URL = BASE_URL + TASKS + params;
const HEADER = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({providedIn: 'root'})
export class ProjectsService {
  constructor(private http: HttpClient) {
  }

  all() {
    return this.http.get(FULL_URL);
  }

  load(id) {
    return this.http.get(`${FULL_URL}${id}`);
  }

  create(project: Project) {
    return this.http.post(`${FULL_URL}`, JSON.stringify(project), HEADER);
  }

  update(project: Project) {
    return this.http.patch(`${FULL_URL}${project.id}`, JSON.stringify(project), HEADER);
  }

  delete(project: Project) {
    return this.http.delete(`${FULL_URL}${project.id}`);
  }

  search(term: string) {
    const params = new HttpParams();
    params.set('q', term);

    return this.http.get(`${FULL_URL}`, {params});
  }
}
