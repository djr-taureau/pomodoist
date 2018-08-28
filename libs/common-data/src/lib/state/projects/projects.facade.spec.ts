import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nrwl/nx/testing';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { NxModule } from '@nrwl/nx';
import { Project } from '../../core/projects/project.model';
import { ProjectsService } from '../../core/projects/projects.service';
import { ProjectsServiceStub } from '../../core/projects/projects.service.stub';
import { projectsReducer, ProjectsState } from './projects.reducer';
import { ProjectsFacade } from './projects.facade';
import { ProjectsEffects } from './projects.effects';
import * as ProjectsActions from './projects.actions';

interface TestSchema {
  'Projects' : ProjectsState
}

fdescribe('ProjectsFacade', () => {
  let facade: ProjectsFacade;
  let store: Store<TestSchema>;
  let createProject;
  let projectsService: ProjectsService;

  beforeEach(() => {
    createProject = ( id:number, name = '', comment_count = null, indent = null, order = null ): Project => ({
      id,
      name: name ? `name-${id}` : id.toString(),
      comment_count: comment_count,
      indent: indent,
      order: order

    });
  });

  describe('used in NgModule', () => {

    beforeEach(() => {
      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({Projects: projectsReducer}),
          EffectsModule.forRoot([ProjectsEffects]),
        ],
        providers: [
          {provide: ProjectsService, useClass: ProjectsServiceStub},
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      projectsService = TestBed.get(ProjectsService);
      store = TestBed.get(Store);
      facade = TestBed.get(ProjectsFacade);
    });

    it('allProjects$ should return the current list', async (done) => {
      try {
        let list = await readFirst(facade.allProjects$);

        expect(list.length).toBe(0);

        store.dispatch(new ProjectsActions.ProjectsLoaded([
          createProject('AAA'),
          createProject('BBB')
        ]));

        list = await readFirst(facade.allProjects$);

        expect(list.length).toBe(2);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('currentProject$ should return the currently selectedProject', async (done) => {
      try {
        let current = await readFirst(facade.currentProject$);

        expect(current.id).toBeNull();

        store.dispatch(new ProjectsActions.ProjectsLoaded([
          createProject('AAA'),
          createProject('BBB')
        ]));

        store.dispatch(new ProjectsActions.ProjectSelected('BBB'));

        current = await readFirst(facade.currentProject$);

        expect(current.id).toBe('BBB');

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('mutations$ should only stream mutative actions', () => {
      const addProjectAction = new ProjectsActions.AddProject({} as Project),
        updateProjectAction = new ProjectsActions.UpdateProject({} as Project),
        deleteProjectAction = new ProjectsActions.DeleteProject({} as Project);

      const actions = [];
      facade.mutations$.subscribe(mutation => {
        actions.push(mutation);
      });

      store.dispatch(addProjectAction);
      store.dispatch(new ProjectsActions.LoadProjects());
      store.dispatch(updateProjectAction);
      store.dispatch(new ProjectsActions.ProjectSelected({}));
      store.dispatch(deleteProjectAction);

      const expectedActions = [
        addProjectAction,
        updateProjectAction,
        deleteProjectAction
      ];

      expect(actions).toEqual(expectedActions);
    });

    describe('dispatchers', () => {

      beforeEach(() => {
        spyOn(store, 'dispatch');
      });

      it('#selectProject should dispatch `ProjectSelected` action with an Project ID', () => {
        const expectedAction = new ProjectsActions.ProjectSelected('AAA');
        facade.selectProject('AAA');
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });

      it('#loadAll should dispatch `LoadProjects` action', () => {
        const expectedAction = new ProjectsActions.LoadProjects();
        facade.loadAll();
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });

      it('#addProject should dispatch `AddProject` action with an Project', () => {
        const project = createProject('AAA');
        const expectedAction = new ProjectsActions.AddProject(project);
        facade.addProject(project);
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });

      it('#updateProject should dispatch `UpdateProject` action with an Project', () => {
        const project = createProject('AAA');
        const expectedAction = new ProjectsActions.UpdateProject(project);
        facade.updateProject(project);
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });

      it('#deleteProject should dispatch `DeleteProject` action with an Project', () => {
        const project = createProject('AAA');
        const expectedAction = new ProjectsActions.DeleteProject(project);
        facade.deleteProject(project);
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });
    });
  });
});
