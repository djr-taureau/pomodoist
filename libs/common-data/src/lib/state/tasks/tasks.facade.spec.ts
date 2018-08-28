import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nrwl/nx/testing';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { NxModule } from '@nrwl/nx';
import { Task } from '../../core/tasks/task.model';
import { TasksService } from '../../core/tasks/tasks.service';
import { TasksServiceStub } from '../../core/tasks/tasks.service.stub';
import { tasksReducer, TasksState } from './tasks.reducer';
import { TasksFacade } from './tasks.facade';
import { TasksEffects } from './tasks.effects';
import * as TasksActions from './tasks.actions';

interface TestSchema {
  'Tasks' : TasksState
}

fdescribe('TasksFacade', () => {
  let facade: TasksFacade;
  let store: Store<TestSchema>;
  let createTask;
  let tasksService: TasksService;

  beforeEach(() => {
    createTask = ( id:string,
                    content = '',
                    comment_count = 0,
                    completed = false,
                    due = null,
                    indent = null,
                    label_ids = [null], order = null, project_id = null, url = null ): Task => ({
      id,
      content: content ? `content-${id}` : id,
      comment_count: comment_count,
      completed: completed,
      due: due,
      indent: indent,
      label_ids: label_ids,
      order: order,
      project_id: project_id,
      url: url,
    });
  });

  describe('used in NgModule', () => {

    beforeEach(() => {
      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({Tasks: tasksReducer}),
          EffectsModule.forRoot([TasksEffects]),
        ],
        providers: [
          {provide: TasksService, useClass: TasksServiceStub},
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      tasksService = TestBed.get(TasksService);
      store = TestBed.get(Store);
      facade = TestBed.get(TasksFacade);
    });

    it('allTasks$ should return the current list', async (done) => {
      try {
        let list = await readFirst(facade.allTasks$);

        expect(list.length).toBe(0);

        store.dispatch(new TasksActions.TasksLoaded([
          createTask('AAA'),
          createTask('BBB')
        ]));

        list = await readFirst(facade.allTasks$);

        expect(list.length).toBe(2);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('currentTask$ should return the currently selectedTask', async (done) => {
      try {
        let current = await readFirst(facade.currentTask$);

        expect(current.id).toBeNull();

        store.dispatch(new TasksActions.TasksLoaded([
          createTask('AAA'),
          createTask('BBB')
        ]));

        store.dispatch(new TasksActions.TaskSelected('BBB'));

        current = await readFirst(facade.currentTask$);

        expect(current.id).toBe('BBB');

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('mutations$ should only stream mutative actions', () => {
      const addTaskAction = new TasksActions.AddTask({} as Task),
        updateTaskAction = new TasksActions.UpdateTask({} as Task),
        deleteTaskAction = new TasksActions.DeleteTask({} as Task);

      const actions = [];
      facade.mutations$.subscribe(mutation => {
        actions.push(mutation);
      });

      store.dispatch(addTaskAction);
      store.dispatch(new TasksActions.LoadTasks());
      store.dispatch(updateTaskAction);
      store.dispatch(new TasksActions.TaskSelected({}));
      store.dispatch(deleteTaskAction);

      const expectedActions = [
        addTaskAction,
        updateTaskAction,
        deleteTaskAction
      ];

      expect(actions).toEqual(expectedActions);
    });

    describe('dispatchers', () => {

      beforeEach(() => {
        spyOn(store, 'dispatch');
      });

      it('#selectTask should dispatch `TaskSelected` action with an Task ID', () => {
        const expectedAction = new TasksActions.TaskSelected('AAA');
        facade.selectTask('AAA');
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });

      it('#loadAll should dispatch `LoadTasks` action', () => {
        const expectedAction = new TasksActions.LoadTasks();
        facade.loadAll();
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });

      it('#addTask should dispatch `AddTask` action with an Task', () => {
        const task = createTask('AAA');
        const expectedAction = new TasksActions.AddTask(task);
        facade.addTask(Task);
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });

      it('#updateTask should dispatch `UpdateTask` action with an Task', () => {
        const task = createTask('AAA');
        const expectedAction = new TasksActions.UpdateTask(task);
        facade.updateTask(Task);
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });

      it('#deleteTask should dispatch `DeleteTask` action with an Task', () => {
        const task = createTask('AAA');
        const expectedAction = new TasksActions.DeleteTask(task);
        facade.deleteTask(Task);
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });
    });
  });
});
