import { Action } from '@ngrx/store';
import { Pomo } from '@workspace/common-data';

export enum PomosActionTypes {
  PomosAction = '[Pomos] Action',
  PomoSelected = '[Pomos] Selected',
  LoadPomos = '[Pomos] Load Data',
  PomosLoaded = '[Pomos] Data Loaded',
  AddPomo = '[Pomos] Add Data',
  PomoAdded = '[Pomos] Data Added',
  UpdatePomo = '[Pomos] Update Data',
  PomoUpdated = '[Pomos] Data Updated',
  DeletePomo = '[Pomos] Delete Data',
  PomoDeleted = '[Pomos] Data Deleted',
}

export class Pomos implements Action {
  readonly type = PomosActionTypes.PomosAction;
}

export class PomoSelected implements Action {
  readonly type = PomosActionTypes.PomoSelected;
  constructor(public payload) { }
}

export class LoadPomos implements Action {
  readonly type = PomosActionTypes.LoadPomos;
  constructor() {}
}

export class PomosLoaded implements Action {
  readonly type = PomosActionTypes.PomosLoaded;
  constructor(public payload: Pomo[]) {}
}

export class AddPomo implements Action {
  readonly type = PomosActionTypes.AddPomo;
  constructor(public payload: Pomo) {}
}

export class PomoAdded implements Action {
  readonly type = PomosActionTypes.PomoAdded;
  constructor(public payload: Pomo) {}
}

export class UpdatePomo implements Action {
  readonly type = PomosActionTypes.UpdatePomo;
  constructor(public payload: Pomo) {}
}

export class PomoUpdated implements Action {
  readonly type = PomosActionTypes.PomoUpdated;
  constructor(public payload: Pomo) {}
}

export class DeletePomo implements Action {
  readonly type = PomosActionTypes.DeletePomo;
  constructor(public payload: Pomo) {}
}

export class PomoDeleted implements Action {
  readonly type = PomosActionTypes.PomoDeleted;
  constructor(public payload: Pomo) {}
}

export type PomosActions = Pomos
  | PomoSelected
  | LoadPomos
  | PomosLoaded
  | AddPomo
  | PomoAdded
  | UpdatePomo
  | PomoUpdated
  | DeletePomo
  | PomoDeleted
;
