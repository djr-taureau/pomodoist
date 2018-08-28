import { ProjectAdded, ProjectDeleted, ProjectsActionTypes, ProjectSelected, ProjectsLoaded, ProjectUpdated } from './projects.actions';
import { initialState, projectsReducer } from './projects.reducer';
import { Action } from '@ngrx/store';
import { Project } from '@workspace/common-data';
import { selectCurrentProject, selectCurrentProjectId } from '..';

fdescribe('ProjectsReducer', () => {
  it('should return state with unknown action', () => {
    const action = {type: 'DoesNotExist', payload: 'Sample'} as Action;
    const actual = projectsReducer(initialState, action as any);
    expect(actual).toEqual(initialState);
  });

  it(`${ProjectsActionTypes.ProjectsLoaded} action should replace state with payload`, () => {
    const exampleProjects: Project[] = [{id: 'cb1234-sa', name: 'test', indent: null, comment_count: 10, order: null}];
    const entities = {
      'cb1234-sa': exampleProjects[0]
    };

    const action: ProjectsLoaded = new ProjectsLoaded(exampleProjects);
    const state = projectsReducer(initialState, action);
    expect(state.entities).toEqual(entities);
  });

  it(`${ProjectsActionTypes.ProjectAdded} action should add Project to state`, () => {
    const addedProject: Project = {id: 'added-Project', name: 'test', indent: null, comment_count: 10, order: null};
    const entities = {
      'added-Project': addedProject
    };

    const action: ProjectAdded = new ProjectAdded(addedProject);
    const state = projectsReducer(initialState, action);
    expect(state.entities).toEqual(entities);
  });

  it(`${ProjectsActionTypes.ProjectUpdated} action should update Project in state`, () => {
    const existingEntities = { 'existing-Project': { id: 'existing-Project', name: 'test', indent: null, comment_count: 10, order: null } };
    const existingState = {...initialState, entities: existingEntities};

    const updatedProject: Project = {id: 'existing-Project', name: 'test', indent: null, comment_count: 10, order: null};

    const action: ProjectUpdated = new ProjectUpdated(updatedProject);
    const state = projectsReducer(existingState, action);
    expect(state.entities['existing-Project']).toEqual(updatedProject);
  });

  it(`${ProjectsActionTypes.ProjectDeleted} action should remove Project from state`, () => {
    const existingEntities = {
      'existing-Project': { id: 'existing-Project', name: 'existing', indent: null, comment_count: 10, order: null },
      'another-Project': { id: 'another-Project', name: 'another', indent: null, comment_count: 10, order: null },
    };
    const existingState = {...initialState, entities: existingEntities};

    const deletedProject: Project = { id: 'another-Project', name: 'another', indent: null, comment_count: 10, order: null};

    const action: ProjectDeleted = new ProjectDeleted(deletedProject);
    const state = projectsReducer(existingState, action);
    expect(state.entities['another-Project']).not.toBeTruthy();
  });

  it(`${ProjectsActionTypes.ProjectSelected} action should set 'selectedProjectId' in state`, () => {
    const selectedProject = 'Project-id';

    const action: ProjectSelected = new ProjectSelected(selectedProject);
    const state = projectsReducer(initialState, action);
    expect(state.selectedProjectId).toBe(selectedProject);
  });

  describe('selectors', () => {
    it('`selectCurrentProjectId` should get currently selected Project ID', () => {
      const state = {Projects: {...initialState, selectedProjectId: '123'}};
      expect(selectCurrentProjectId(state)).toBe('123');
    });

    describe('`selectCurrentProject`', () => {
      it('should get currently selected Project', () => {
        const state = {
          Projects: {
            ...initialState,
            selectedProjectId: '123',
            entities: { '123': { id: '123', name: 'Test', indent: null, comment_count: 10, order: null } }
          }
        };
        expect(selectCurrentProject(state)).toBe(state.Projects.entities['123']);
      });

      it('should return an empty Project if no selected Project', () => {
        const state = {
          Projects: {
            ...initialState,
            selectedProjectId: null,
            entities: { '123': { id: '123', name: 'Test', indent: null, comment_count: 10, order: null } }
          }
        };
        expect(selectCurrentProject(state)).toEqual({ id: null, name: '', indent: null, comment_count: null, order: null });
      });
    })
  });
});
