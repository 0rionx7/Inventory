import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import { ExpandedSidenavActions, SmallSidenavActions } from '../actions';
import { state } from '@angular/animations';

export interface State {
  expand: boolean;
  selectedMain: number;
  expandedSub: number;
}

const initialState: State = {
  expand: false,
  selectedMain: null,
  expandedSub: null,
};

export const navigationReducer = createReducer(
  initialState,
  on(ExpandedSidenavActions.mainMenuClicked, (state, { mainMenu }) => {
    return { ...state, selectedMain: mainMenu };
  })
);
