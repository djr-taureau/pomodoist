import { TaskAdded, TaskDeleted, TasksActionTypes, TaskSelected, TasksLoaded, TaskUpdated } from './tasks.actions';
import { initialState, tasksReducer } from './tasks.reducer';
import { Action } from '@ngrx/store';
import { Task } from '@workspace/common-data';
import { selectCurrentTask, selectCurrentTaskId } from '..';

fdescribe('tasksReducer', () => {
  it('should return state with unknown action', () => {
    const action = {type: 'DoesNotExist', payload: 'Sample'} as Action;
    const actual = tasksReducer(initialState, action as any);
    expect(actual).toEqual(initialState);
  });

  it(`${TasksActionTypes.TasksLoaded} action should replace state with payload`, () => {
    const exampleTasks: Task[] = [{id: 'csa-132', project_id: 'Test', content: 'Testing', comment_count: null, order: null, label_ids: [null], indent: null, url: null, completed: null, due: null }];
    const entities = {
      'csa-132': exampleTasks[0]
    };

    const action: TasksLoaded = new TasksLoaded(exampleTasks);
    const state = tasksReducer(initialState, action);
    expect(state.entities).toEqual(entities);
  });

  it(`${TasksActionTypes.TaskAdded} action should add Task to state`, () => {
    const addedTask: Task = {id: 'added-task', project_id: 'Test', content: 'Testing', comment_count: null, order: null, label_ids: [null], indent: null, url: null, completed: null, due: null };
    const entities = {
      'added-Task': addedTask
    };

    const action: TaskAdded = new TaskAdded(addedTask);
    const state = tasksReducer(initialState, action);
    expect(state.entities).toEqual(entities);
  });

  it(`${TasksActionTypes.TaskUpdated} action should update Task in state`, () => {
    const existingEntities = { 'existing-Task': {id: 'existing-task', project_id: 'Test', content: 'Testing', comment_count: null, order: null, label_ids: [null], indent: null, url: null, completed: null, due: null } };
    const existingState = {...initialState, entities: existingEntities};

    const updatedTask: Task = {id: 'existing-Task', project_id: 'Test', content: 'Testing', comment_count: null, order: null, label_ids: [null], indent: null, url: null, completed: null, due: null };

    const action: TaskUpdated = new TaskUpdated(updatedTask);
    const state = tasksReducer(existingState, action);
    expect(state.entities['existing-Task']).toEqual(updatedTask);
  });

  it(`${TasksActionTypes.TaskDeleted} action should remove Task from state`, () => {
    const existingEntities = {
      'existing-Task': {id: 'existing-Task', project_id: 'Test', content: 'Testing', comment_count: null, order: null, label_ids: [null], indent: null, url: null, completed: null, due: null },
      'another-Task': {id: 'another-Task', project_id: 'Test', content: 'Testing', comment_count: null, order: null, label_ids: [null], indent: null, url: null, completed: null, due: null },
    };
    const existingState = {...initialState, entities: existingEntities};

    const deletedTask: Task = {id: 'another-Task', project_id: 'Test', content: 'Testing', comment_count: null, order: null, label_ids: [null], indent: null, url: null, completed: null, due: null };

    const action: TaskDeleted = new TaskDeleted(deletedTask);
    const state = tasksReducer(existingState, action);
    expect(state.entities['another-Task']).not.toBeTruthy();
  });

  it(`${TasksActionTypes.TaskSelected} action should set 'selectedTaskId' in state`, () => {
    const selectedTask = 'Task-id';

    const action: TaskSelected = new TaskSelected(selectedTask);
    const state = tasksReducer(initialState, action);
    expect(state.selectedTaskId).toBe(selectedTask);
  });

  describe('selectors', () => {
    it('`selectCurrentTaskId` should get currently selected Task ID', () => {
      const state = {Tasks: {...initialState, selectedTaskId: '123'}};
      expect(selectCurrentTaskId(state)).toBe('123');
    });

    // describe('`selectCurrentTask`', () => {
    //   it('should get currently selected Task', () => {
    //     const state = {
    //       Tasks: {
    //         ...initialState,
    //         selectedTaskId: '123',
    //         entities: { '123': {id: '123', project_id: 'Test', content: 'Testing', comment_count: null, order: null, label_ids: [null], indent: null, url: null, completed: null, due: null } }
    //       }
    //     };
    //     expect(selectCurrentTask(state)).toBe(state.Tasks.entities['123']);
    //   });

    //   it('should return an empty Task if no selected Task', () => {
    //     const state = {
    //       Tasks: {
    //         ...initialState,
    //         selectedTaskId: null,
    //         entities: {'123': {id: null, project_id: null, content: '', comment_count: null, order: null, label_ids: [null], indent: null, url: null, completed: null, due: null } }
    //       }
    //     };
    //     expect(selectCurrentTask(state)).toEqual({id: null, project_id: '', content: '', comment_count: null, order: null, label_ids: [null], indent: null, url: null, completed: null, due: null });
    //   });
    // })
  });
});
