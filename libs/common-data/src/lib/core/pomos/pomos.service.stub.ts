import { of } from 'rxjs';

export class PomosServiceStub {
  all() {return of([])}
  create(pomo) {return of({})}
  update(pomo) {return of({})}
  delete(pomo) {return of({})}
}
