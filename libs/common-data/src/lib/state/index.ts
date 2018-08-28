import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromTasks from './tasks/tasks.reducer';
import * as fromPomos from './pomos/pomos.reducer';
import * as fromProjects from './projects/projects.reducer';
import * as fromUsers from './users/users.reducer';

export interface AppState {
  tasks: fromTasks.TasksState,
  projects: fromProjects.ProjectsState,
  pomos: fromPomos.PomosState,
  users: fromUsers.UsersState
}

export const reducers: ActionReducerMap<AppState> = {
  tasks: fromTasks.tasksReducer,
  projects: fromProjects.projectsReducer,
  pomos: fromPomos.pomosReducer,
  users: fromUsers.usersReducer
};

// -------------------------------------------------------------------
// Tasks SELECTORS
// -------------------------------------------------------------------
export const selectTaskTasksState = createFeatureSelector<fromTasks.TasksState>('tasks');

export const selectTaskIds = createSelector(
  selectTaskTasksState,
  fromTasks.selectTaskIds
);
export const selectTaskEntities = createSelector(
  selectTaskTasksState,
  fromTasks.selectTaskEntities
);
export const selectAllTasks = createSelector(
  selectTaskTasksState,
  fromTasks.selectAllTasks
);
export const selectTaskTotal = createSelector(
  selectTaskTasksState,
  fromTasks.selectTaskTotal
);
export const selectCurrentTaskId = createSelector(
  selectTaskTasksState,
  fromTasks.getSelectedTaskId
);

export const selectCurrentTask = createSelector(
  selectTaskEntities,
  selectCurrentTaskId,
  (taskEntities, taskId) => {
    const emptyTask = {id: '', project_id: '', content: '', comment_count: null, order: null, label_ids: [null], indent: null, url: null, completed: null, due: null };
    return taskId ? taskEntities[taskId] : emptyTask;
  }
);

// -------------------------------------------------------------------
// Pomos SELECTORS
// -------------------------------------------------------------------
export const selectPomoPomosState = createFeatureSelector<fromPomos.PomosState>('pomos');

export const selectPomoIds = createSelector(
  selectPomoPomosState,
  fromPomos.selectPomoIds
);
export const selectPomoEntities = createSelector(
  selectPomoPomosState,
  fromPomos.selectPomoEntities
);
export const selectAllPomos = createSelector(
  selectPomoPomosState,
  fromPomos.selectAllPomos
);
export const selectPomoTotal = createSelector(
  selectPomoPomosState,
  fromPomos.selectPomoTotal
);
export const selectCurrentPomoId = createSelector(
  selectPomoPomosState,
  fromPomos.getSelectedPomoId
);

export const selectCurrentPomo = createSelector(
  selectPomoEntities,
  selectCurrentPomoId,
  (pomoEntities, pomoId) => {
    const emptyPomo = { id: null, notes: '', task_id: null, date: null };
    return pomoId ? pomoEntities[pomoId] : emptyPomo;
  }
);

// -------------------------------------------------------------------
// Projects SELECTORS
// -------------------------------------------------------------------
export const selectProjectProjectsState = createFeatureSelector<fromProjects.ProjectsState>('projects');

export const selectProjectIds = createSelector(
  selectProjectProjectsState,
  fromProjects.selectProjectIds
);
export const selectProjectEntities = createSelector(
  selectProjectProjectsState,
  fromProjects.selectProjectEntities
);
export const selectAllProjects = createSelector(
  selectProjectProjectsState,
  fromProjects.selectAllProjects
);
export const selectProjectTotal = createSelector(
  selectProjectProjectsState,
  fromProjects.selectProjectTotal
);
export const selectCurrentProjectId = createSelector(
  selectProjectProjectsState,
  fromProjects.getSelectedProjectId
);

export const selectCurrentProject = createSelector(
  selectProjectEntities,
  selectCurrentProjectId,
  (projectEntities, projectId) => {
    const emptyProject = { id: null, indent: null, order: null, name: '', comment_count: null };
    return projectId ? projectEntities[projectId] : emptyProject;
  }
);

// -------------------------------------------------------------------
// USERS SELECTORS
// -------------------------------------------------------------------
export const selectUserUsersState = createFeatureSelector<fromUsers.UsersState>('users');

export const selectAllUsers = createSelector(
  selectUserUsersState,
  fromUsers.selectAllUsers
);

export const selectUsersDetails = createSelector(
  selectAllUsers,
  selectTaskEntities,
  selectProjectEntities,
  selectPomoEntities,
  (users, taskEntities, pomoEntities, projectEntities) => {
    return users.map(u => ({
      ...u,
      tasks: u.tasks.map(taskId => taskEntities[taskId]),
      pomos: u.pomos.map(pomoId => pomoEntities[pomoId]),
      projets: u.projects.map(projectId => projectEntities[projectId])
    }));
  }
);
