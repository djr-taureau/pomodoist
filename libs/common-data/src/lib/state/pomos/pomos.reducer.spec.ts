import { PomosLoaded } from './pomos.actions';
import { initialState, pomosReducer } from './pomos.reducer';

describe('pomosReducer', () => {
  it('should work', () => {
    const action: PomosLoaded = new PomosLoaded([]);
    const actual = pomosReducer(initialState, action);
    expect(actual).toEqual(<any>[]);
  });
});
