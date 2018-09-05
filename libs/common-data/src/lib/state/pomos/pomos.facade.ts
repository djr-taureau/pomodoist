import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import { selectAllPomos, selectCurrentPomo, selectTaskPomos } from '..';
import { PomosActionTypes } from './pomos.actions';
import * as PomosActions from './pomos.actions';
import { PomosState } from './pomos.reducer';

@Injectable({
  providedIn: 'root'
})
export class PomosFacade {
  allPomos$ = this.store.pipe(select(selectAllPomos));
  taskPomos$ = this.store.pipe(select(selectTaskPomos));
  currentPomo$ = this.store.pipe(select(selectCurrentPomo));

  mutations$ = this.actions$.pipe(
    filter(action =>
      action.type === PomosActionTypes.AddPomo
      || action.type === PomosActionTypes.UpdatePomo
      || action.type === PomosActionTypes.DeletePomo
    )
  );

  constructor(private store: Store<PomosState>, private actions$: ActionsSubject) {}

  selectPomo(PomoId) {
    this.store.dispatch(new PomosActions.PomoSelected(PomoId));
  }

  selectPomos() {
    /// \return this.taskPomos$ = this.store.pipe(select(selectTaskPomos))
  }

  loadAll() {
    this.store.dispatch(new PomosActions.LoadPomos());
  }

  addPomo(Pomo) {
    this.store.dispatch(new PomosActions.AddPomo(Pomo));
  }

  updatePomo(Pomo) {
    this.store.dispatch(new PomosActions.UpdatePomo(Pomo));
  }

  deletePomo(Pomo) {
    this.store.dispatch(new PomosActions.DeletePomo(Pomo));
  }
}
