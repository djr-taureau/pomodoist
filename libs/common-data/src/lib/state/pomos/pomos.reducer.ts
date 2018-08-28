import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Pomo } from '@workspace/common-data';

import { PomosActions, PomosActionTypes } from './pomos.actions';

/**
 * Interface to the part of the Store containing PomosState
 * and other information related to PomosData.
 */
export interface PomosState extends EntityState<Pomo> {
  selectedPomoId: string | null;
}

export const adapter: EntityAdapter<Pomo> = createEntityAdapter<Pomo>();
export const initialState: PomosState = adapter.getInitialState({
  // additional entity state properties
  selectedPomoId: null,
});

export function pomosReducer(
  state = initialState,
  action: PomosActions
): PomosState {
  switch (action.type) {
    case PomosActionTypes.PomoSelected: {
      return Object.assign({}, state, { selectedPomoId: action.payload });
    }

    case PomosActionTypes.PomosLoaded: {
      return adapter.addAll(action.payload, state);
    }

    case PomosActionTypes.PomoAdded: {
      return adapter.addOne(action.payload, state);
    }

    case PomosActionTypes.PomoUpdated: {
      return adapter.upsertOne(action.payload, state);
    }

    case PomosActionTypes.PomoDeleted: {
      return adapter.removeOne(action.payload.id, state);
    }

    default:
      return state;
  }
}

export const getSelectedPomoId = (state: PomosState) => state.selectedPomoId;

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of Pomo ids
export const selectPomoIds = selectIds;

// select the dictionary of Pomo entities
export const selectPomoEntities = selectEntities;

// select the array of Pomos
export const selectAllPomos = selectAll;

// select the total Pomo count
export const selectPomoTotal = selectTotal;

