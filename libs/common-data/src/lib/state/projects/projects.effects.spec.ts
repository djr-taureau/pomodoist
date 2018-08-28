import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { cold, hot } from '@nrwl/nx/testing';
import { Observable, of, throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AddProject, DeleteProject, ProjectAdded, ProjectDeleted, ProjectsLoaded, ProjectUpdated, LoadProjects, UpdateProject } from './projects.actions';
import { ProjectsEffects } from './projects.effects';
import { ProjectsService } from '../../core/projects/projects.service';
import { Project } from '../../core/projects/project.model';
import { ProjectsServiceStub } from '../../core/projects/projects.service.stub';

describe('ProjectsEffects', () => {
  let actions$: Observable<any>;
  let effects$: ProjectsEffects;
  let projectsService: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        ProjectsEffects,
        DataPersistence,
        provideMockActions(() => actions$),
        {provide: ProjectsService, useClass: ProjectsServiceStub}
      ]
    });

    effects$ = TestBed.get(ProjectsEffects);
    projectsService = TestBed.get(ProjectsService);
  });

  describe('`loadProjects$`', () => {
    it('should trigger `ProjectsLoaded` action with data from `ProjectsService.all`', () => {
      const projects = [{id: 1, comment_count: null, name: 'Testing', indent: 1, order: 4313}];
      spyOn(projectsService, 'all').and.returnValue(of(projects));

      actions$ = hot('-a-|', { a: new LoadProjects() });
      const expected$ = cold('-a-|', { a: new ProjectsLoaded(projects) });

      expect(effects$.loadProjects$).toBeObservable(expected$);
      expect(projectsService.all).toHaveBeenCalled();
    });

    it('should log errors', () => {
      spyOn(projectsService, 'all').and.returnValue(throwError('That did not go well...'));
      spyOn(console, 'error').and.callThrough();

      actions$ = hot('-a-|', { a: new LoadProjects() });
      effects$.loadProjects$
        .pipe(finalize(() => expect(console.error).toHaveBeenCalledWith('Error', 'That did not go well...')))
        .subscribe();
    });
  });

  describe('`addProject$`', () => {
    it('should trigger `ProjectAdded` action with data from `ProjectsService.create`', () => {
      const project = {id: null, comment_count: null, name: 'Testing', indent: 1, order: 4313};
      const createdProject = {...project, id: 12};
      spyOn(projectsService, 'create').and.returnValue(of(createdProject));

      actions$ = hot('-a-|', { a: new AddProject(project) });
      const expected$ = cold('-a-|', { a: new ProjectAdded(createdProject) });

      expect(effects$.addProject$).toBeObservable(expected$);
      expect(projectsService.create).toHaveBeenCalledWith(project);
    });

    it('should log errors', () => {
      spyOn(projectsService, 'create').and.returnValue(throwError('That did not go well...'));
      spyOn(console, 'error').and.callThrough();

      actions$ = hot('-a-|', { a: new AddProject({} as Project) });
      effects$.addProject$
        .pipe(finalize(() => expect(console.error).toHaveBeenCalledWith('Error', 'That did not go well...')))
        .subscribe();
    });
  });

  describe('`updateProject$`', () => {
    it('should trigger `ProjectUpdated` action with data from `ProjectsService.update`', () => {
      const project = {id: 1, comment_count: null, name: 'Testing', indent: 1, order: 4313};
      const updatedProject = {...project, name: 'Updated', description: 'Different'};
      spyOn(projectsService, 'update').and.returnValue(of(updatedProject));

      actions$ = hot('-a-|', { a: new UpdateProject(project) });
      const expected$ = cold('-a-|', { a: new ProjectUpdated(updatedProject) });

      expect(effects$.updateProject$).toBeObservable(expected$);
      expect(projectsService.update).toHaveBeenCalledWith(project);
    });

    it('should log errors', () => {
      spyOn(projectsService, 'update').and.returnValue(throwError('That did not go well...'));
      spyOn(console, 'error').and.callThrough();

      actions$ = hot('-a-|', { a: new UpdateProject({} as Project) });
      effects$.updateProject$
        .pipe(finalize(() => expect(console.error).toHaveBeenCalledWith('Error', 'That did not go well...')))
        .subscribe();
    });
  });

  describe('`deleteProject$`', () => {
    it('should trigger `ProjectDeleted` action with data from `ProjectsService.delete`', () => {
      const project = {id: 1, comment_count: null, name: 'Testing', indent: 1, order: 4313};
      spyOn(projectsService, 'delete').and.returnValue(of(project));

      actions$ = hot('-a-|', { a: new DeleteProject(project) });
      const expected$ = cold('-a-|', { a: new ProjectDeleted(project) });

      expect(effects$.deleteProject$).toBeObservable(expected$);
      expect(projectsService.delete).toHaveBeenCalledWith(project);
    });

    it('should log errors', () => {
      spyOn(projectsService, 'delete').and.returnValue(throwError('That did not go well...'));
      spyOn(console, 'error').and.callThrough();

      actions$ = hot('-a-|', { a: new DeleteProject({} as Project) });
      effects$.deleteProject$
        .pipe(finalize(() => expect(console.error).toHaveBeenCalledWith('Error', 'That did not go well...')))
        .subscribe();
    });
  });
});
