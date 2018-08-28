import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';
import { Observable } from 'rxjs';

import { LoadPomos, PomosLoaded } from './pomos.actions';
import { PomosEffects } from './pomos.effects';

describe('PomosEffects', () => {
  let actions$: Observable<any>;
  let effects$: PomosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        PomosEffects,
        DataPersistence,
        provideMockActions(() => actions$)
      ]
    });

    effects$ = TestBed.get(PomosEffects);
  });

  describe('someEffect', () => {
    it('should work', () => {
      actions$ = hot('-a-|', { a: new LoadPomos() });
      expect(effects$.loadPomos$).toBeObservable(
        hot('-a-|', { a: new PomosLoaded([]) })
      );
    });
  });
});
