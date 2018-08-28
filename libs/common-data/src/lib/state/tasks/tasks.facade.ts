import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import { selectAllTasks, selectCurrentTask } from '..';
import { TasksActionTypes } from './tasks.actions';
import * as TasksActions from './tasks.actions';
import { TasksState } from './tasks.reducer';

@Injectable({
  providedIn: 'root'
})
export class TasksFacade {
  allTasks$ = this.store.pipe(select(selectAllTasks));
  currentTask$ = this.store.pipe(select(selectCurrentTask));

  mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === TasksActionTypes.AddTask
        || action.type === TasksActionTypes.UpdateTask
        || action.type === TasksActionTypes.DeleteTask
      )
    );

  constructor(private store: Store<TasksState>, private actions$: ActionsSubject) {}

  selectTask(taskId) {
    this.store.dispatch(new TasksActions.TaskSelected(taskId));
  }

  loadAll() {
    this.store.dispatch(new TasksActions.LoadTasks());
  }

  addTask(task) {
    this.store.dispatch(new TasksActions.AddTask(task));
  }

  updateTask(task) {
    this.store.dispatch(new TasksActions.UpdateTask(task));
  }

  deleteTask(task) {
    this.store.dispatch(new TasksActions.DeleteTask(task));
  }
}
