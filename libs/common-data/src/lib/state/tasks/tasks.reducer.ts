import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Task } from '@workspace/common-data';

import { TasksActions, TasksActionTypes } from './tasks.actions';

/**
 * Interface to the part of the Store containing TasksState
 * and other information related to TasksData.
 */
export interface TasksState extends EntityState<Task> {
  selectedTaskId: string | null;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();
export const initialState: TasksState = adapter.getInitialState({
  // additional entity state properties
  selectedTaskId: null,
});

export function tasksReducer(
  state = initialState,
  action: TasksActions
): TasksState {
  switch (action.type) {
    case TasksActionTypes.TaskSelected: {
      return Object.assign({}, state, { selectedTaskId: action.payload });
    }

    case TasksActionTypes.TasksLoaded: {
      return adapter.addAll(action.payload, state);
    }

    case TasksActionTypes.TaskAdded: {
      return adapter.addOne(action.payload, state);
    }

    case TasksActionTypes.TaskUpdated: {
      return adapter.upsertOne(action.payload, state);
    }

    case TasksActionTypes.TaskDeleted: {
      return adapter.removeOne(action.payload.id, state);
    }

    default:
      return state;
  }
}

export const getSelectedTaskId = (state: TasksState) => state.selectedTaskId;

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of Task ids
export const selectTaskIds = selectIds;

// select the dictionary of Task entities
export const selectTaskEntities = selectEntities;

// select the array of Tasks
export const selectAllTasks = selectAll;

// select the total Task count
export const selectTaskTotal = selectTotal;
