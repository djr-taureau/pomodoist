import { Action } from '@ngrx/store';
import { Task } from '@workspace/common-data';

export enum TasksActionTypes {
  TasksAction = '[Tasks] Action',
  TaskSelected = '[Tasks] Selected',
  LoadTasks = '[Tasks] Load Data',
  TasksLoaded = '[Tasks] Data Loaded',
  AddTask = '[Tasks] Add Data',
  TaskAdded = '[Tasks] Data Added',
  UpdateTask = '[Tasks] Update Data',
  TaskUpdated = '[Tasks] Data Updated',
  DeleteTask = '[Tasks] Delete Data',
  TaskDeleted = '[Tasks] Data Deleted',
}

export class Tasks implements Action {
  readonly type = TasksActionTypes.TasksAction;
}

export class TaskSelected implements Action {
  readonly type = TasksActionTypes.TaskSelected;
  constructor(public payload) { }
}

export class LoadTasks implements Action {
  readonly type = TasksActionTypes.LoadTasks;
  constructor() { }
}

export class TasksLoaded implements Action {
  readonly type = TasksActionTypes.TasksLoaded;
  constructor(public payload: Task[]) { }
}

export class AddTask implements Action {
  readonly type = TasksActionTypes.AddTask;
  constructor(public payload: Task) { }
}

export class TaskAdded implements Action {
  readonly type = TasksActionTypes.TaskAdded;
  constructor(public payload: Task) { }
}

export class UpdateTask implements Action {
  readonly type = TasksActionTypes.UpdateTask;
  constructor(public payload: Task) { }
}

export class TaskUpdated implements Action {
  readonly type = TasksActionTypes.TaskUpdated;
  constructor(public payload: Task) { }
}

export class DeleteTask implements Action {
  readonly type = TasksActionTypes.DeleteTask;
  constructor(public payload: Task) { }
}

export class TaskDeleted implements Action {
  readonly type = TasksActionTypes.TaskDeleted;
  constructor(public payload: Task) { }
}

export type TasksActions = Tasks
  | TaskSelected
  | LoadTasks
  | TasksLoaded
  | AddTask
  | TaskAdded
  | UpdateTask
  | TaskUpdated
  | DeleteTask
  | TaskDeleted
;
