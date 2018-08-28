import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';

import {
  AddTask,
  DeleteTask,
  TaskAdded,
  TaskDeleted,
  TasksActionTypes,
  TasksLoaded,
  TaskUpdated,
  LoadTasks,
  UpdateTask
} from './tasks.actions';
import { Task } from '../../core/tasks/task.model';
import { TasksState } from './tasks.reducer';
import { TasksService } from '../../core/tasks/tasks.service';

@Injectable({providedIn: 'root'})
export class TasksEffects {
  @Effect() effect$ = this.actions$.ofType(TasksActionTypes.TasksAction);

  @Effect()
  loadTasks$ = this.dataPersistence.fetch(TasksActionTypes.LoadTasks, {
    run: (action: LoadTasks, state: TasksState) => {
      return this.tasksService.all().pipe(map((res: Task[]) => new TasksLoaded(res)))
    },

    onError: (action: LoadTasks, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  addTask$ = this.dataPersistence.pessimisticUpdate(TasksActionTypes.AddTask, {
    run: (action: AddTask, state: TasksState) => {
      return this.tasksService.create(action.payload).pipe(map((res: Task) => new TaskAdded(res)))
    },

    onError: (action: AddTask, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  updateTask$ = this.dataPersistence.pessimisticUpdate(TasksActionTypes.UpdateTask, {
    run: (action: UpdateTask, state: TasksState) => {
      return this.tasksService.update(action.payload).pipe(map((res: Task) => new TaskUpdated(res)))
    },

    onError: (action: UpdateTask, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  deleteTask$ = this.dataPersistence.pessimisticUpdate(TasksActionTypes.DeleteTask, {
    run: (action: DeleteTask, state: TasksState) => {
      return this.tasksService.delete(action.payload).pipe(map(_ => new TaskDeleted(action.payload)))
    },

    onError: (action: DeleteTask, error) => {
      console.error('Error', error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<TasksState>,
    private tasksService: TasksService
  ) {}
}
