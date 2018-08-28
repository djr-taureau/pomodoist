import { of } from 'rxjs';

export class TasksServiceStub {
  all() {return of([])}
  create(task) {return of({})}
  update(task) {return of({})}
  delete(task) {return of({})}
}
