import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';

import { Pomo } from '../../core/pomos/pomo.model';
import { PomosService } from '../../core/pomos/pomos.service';
import {
  AddPomo,
  DeletePomo,
  LoadPomos,
  UpdatePomo,
  PomoAdded,
  PomoDeleted,
  PomosActionTypes,
  PomosLoaded,
  PomoUpdated,
} from './pomos.actions';
import { PomosState } from './pomos.reducer';

@Injectable({providedIn: 'root'})
export class PomosEffects {
  @Effect() effect$ = this.actions$.ofType(PomosActionTypes.PomosAction);

  @Effect()
  loadPomos$ = this.dataPersistence.fetch(PomosActionTypes.LoadPomos, {
    run: (action: LoadPomos, state: PomosState) => {
      return this.pomosService.all().pipe(map((res: Pomo[]) => new PomosLoaded(res)))
    },

    onError: (action: LoadPomos, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  addPomo$ = this.dataPersistence.pessimisticUpdate(PomosActionTypes.AddPomo, {
    run: (action: AddPomo, state: PomosState) => {
      return this.pomosService.create(action.payload).pipe(map((res: Pomo) => new PomoAdded(res)))
    },

    onError: (action: AddPomo, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  updatePomo$ = this.dataPersistence.pessimisticUpdate(PomosActionTypes.UpdatePomo, {
    run: (action: UpdatePomo, state: PomosState) => {
      return this.pomosService.update(action.payload).pipe(map((res: Pomo) => new PomoUpdated(res)))
    },

    onError: (action: UpdatePomo, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  deletePomo$ = this.dataPersistence.pessimisticUpdate(PomosActionTypes.DeletePomo, {
    run: (action: DeletePomo, state: PomosState) => {
      return this.pomosService.delete(action.payload).pipe(map(_ => new PomoDeleted(action.payload)))
    },

    onError: (action: DeletePomo, error) => {
      console.error('Error', error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<PomosState>,
    private pomosService: PomosService
  ) {}
}
