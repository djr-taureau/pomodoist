import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { cold, hot } from '@nrwl/nx/testing';
import { Observable, of, throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AddTask, DeleteTask, TaskAdded, TaskDeleted, TasksLoaded, TaskUpdated, LoadTasks, UpdateTask } from './tasks.actions';
import { TasksEffects } from './tasks.effects';
import { TasksService } from '../../core/tasks/tasks.service';
import { Task } from '../../core/tasks/task.model';
import { TasksServiceStub } from '../../core/tasks/tasks.service.stub';

fdescribe('TasksEffects', () => {
  let actions$: Observable<any>;
  let effects$: TasksEffects;
  let tasksService: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        TasksEffects,
        DataPersistence,
        provideMockActions(() => actions$),
        {provide: TasksService, useClass: TasksServiceStub}
      ]
    });

    effects$ = TestBed.get(TasksEffects);
    tasksService = TestBed.get(TasksService);
  });

  describe('`loadTasks$`', () => {
    it('should trigger `TasksLoaded` action with data from `TasksService.all`', () => {
      const tasks = [{id: 'csa-132', project_id: 'Test', content: 'Testing', comment_count: null, order: null, label_ids: [null], indent: null, url: null, completed: null, due: null }];
      spyOn(tasksService, 'all').and.returnValue(of(tasks));

      actions$ = hot('-a-|', { a: new LoadTasks() });
      const expected$ = cold('-a-|', { a: new TasksLoaded(tasks) });

      expect(effects$.loadTasks$).toBeObservable(expected$);
      expect(tasksService.all).toHaveBeenCalled();
    });

    it('should log errors', () => {
      spyOn(tasksService, 'all').and.returnValue(throwError('That did not go well...'));
      spyOn(console, 'error').and.callThrough();

      actions$ = hot('-a-|', { a: new LoadTasks() });
      effects$.loadTasks$
        .pipe(finalize(() => expect(console.error).toHaveBeenCalledWith('Error', 'That did not go well...')))
        .subscribe();
    });
  });

  // describe('`addTask$`', () => {
  //   it('should trigger `TaskAdded` action with data from `TasksService.create`', () => {
  //     const task = {id: null, project_id: 'Test', content: 'Testing', comment_count: null, order: null, label_ids: [null], indent: null, url: null, completed: null, due: null }};
  //     const createdTask = {...Task, id: 'jhh14-created'};
  //     spyOn(tasksService, 'create').and.returnValue(of(createdTask));

  //     actions$ = hot('-a-|', { a: new AddTask(Task) });
  //     const expected$ = cold('-a-|', { a: new TaskAdded(createdTask) });

  //     expect(effects$.addTask$).toBeObservable(expected$);
  //     expect(tasksService.create).toHaveBeenCalledWith(task);
  //   });

  //   it('should log errors', () => {
  //     spyOn(tasksService, 'create').and.returnValue(throwError('That did not go well...'));
  //     spyOn(console, 'error').and.callThrough();

  //     actions$ = hot('-a-|', { a: new AddTask({} as Task) });
  //     effects$.addTask$
  //       .pipe(finalize(() => expect(console.error).toHaveBeenCalledWith('Error', 'That did not go well...')))
  //       .subscribe();
  //   });
  // });

  describe('`updateTask$`', () => {
    it('should trigger `TaskUpdated` action with data from `TasksService.update`', () => {
      const task = {id: 'csa-132-updated', project_id: 'Test', content: 'Testing', comment_count: null, order: null, label_ids: [null], indent: null, url: null, completed: null, due: null };
      const updatedTask = {...task, name: 'Updated', description: 'Different'};
      spyOn(tasksService, 'update').and.returnValue(of(updatedTask));

      actions$ = hot('-a-|', { a: new UpdateTask(task) });
      const expected$ = cold('-a-|', { a: new TaskUpdated(updatedTask) });

      expect(effects$.updateTask$).toBeObservable(expected$);
      expect(tasksService.update).toHaveBeenCalledWith(Task);
    });

    it('should log errors', () => {
      spyOn(tasksService, 'update').and.returnValue(throwError('That did not go well...'));
      spyOn(console, 'error').and.callThrough();

      actions$ = hot('-a-|', { a: new UpdateTask({} as Task) });
      effects$.updateTask$
        .pipe(finalize(() => expect(console.error).toHaveBeenCalledWith('Error', 'That did not go well...')))
        .subscribe();
    });
  });

  describe('`deleteTask$`', () => {
    it('should trigger `TaskDeleted` action with data from `TasksService.delete`', () => {
      const task = {id: 'csa-132-deleted', project_id: 'Test', content: 'Testing', comment_count: null, order: null, label_ids: [null], indent: null, url: null, completed: null, due: null };
      spyOn(tasksService, 'delete').and.returnValue(of(Task));

      actions$ = hot('-a-|', { a: new DeleteTask(task) });
      const expected$ = cold('-a-|', { a: new TaskDeleted(task) });

      expect(effects$.deleteTask$).toBeObservable(expected$);
      expect(tasksService.delete).toHaveBeenCalledWith(Task);
    });

    it('should log errors', () => {
      spyOn(tasksService, 'delete').and.returnValue(throwError('That did not go well...'));
      spyOn(console, 'error').and.callThrough();

      actions$ = hot('-a-|', { a: new DeleteTask({} as Task) });
      effects$.deleteTask$
        .pipe(finalize(() => expect(console.error).toHaveBeenCalledWith('Error', 'That did not go well...')))
        .subscribe();
    });
  });
});
