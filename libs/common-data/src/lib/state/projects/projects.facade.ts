import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import { selectAllProjects, selectCurrentProject } from '..';
import { ProjectsActionTypes } from './projects.actions';
import * as ProjectsActions from './projects.actions';
import { ProjectsState } from './projects.reducer';

@Injectable({
  providedIn: 'root'
})
export class ProjectsFacade {
  allProjects$ = this.store.pipe(select(selectAllProjects));
  currentProject$ = this.store.pipe(select(selectCurrentProject));

  mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === ProjectsActionTypes.AddProject
        || action.type === ProjectsActionTypes.UpdateProject
        || action.type === ProjectsActionTypes.DeleteProject
      )
    );

  constructor(private store: Store<ProjectsState>, private actions$: ActionsSubject) {}

  selectProject(projectId) {
    this.store.dispatch(new ProjectsActions.ProjectSelected(projectId));
  }

  loadAll() {
    this.store.dispatch(new ProjectsActions.LoadProjects());
  }

  addProject(project) {
    this.store.dispatch(new ProjectsActions.AddProject(project));
  }

  updateProject(project) {
    this.store.dispatch(new ProjectsActions.UpdateProject(project));
  }

  deleteProject(project) {
    this.store.dispatch(new ProjectsActions.DeleteProject(project));
  }
}
