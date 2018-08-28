import { of } from 'rxjs';

export class ProjectsServiceStub {
  all() {return of([])}
  create(project) {return of({})}
  update(project) {return of({})}
  delete(project) {return of({})}
}
