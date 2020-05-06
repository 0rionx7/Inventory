import { createReducer, on, Action } from '@ngrx/store';

import { ExpandedSidenavActions, SmallSidenavActions } from '../actions';

export interface State {
  expandSidenav: boolean;
  selectedMenuIndex: number;
  expandSub: boolean;
}

const initialState: State = {
  expandSidenav: false,
  selectedMenuIndex: null,
  expandSub: null,
};

export const reducer = createReducer(
  initialState,
  on(ExpandedSidenavActions.mainMenuClicked, (state, { menuIndex }) => {
    return {
      ...state,
      selectedMenuIndex: menuIndex,
      expandSub: menuIndex !== state.selectedMenuIndex || !state.expandSub,
    };
  }),
  on(SmallSidenavActions.iconClicked, (state, { menuIndex }) => {
    const expantion =
      menuIndex !== state.selectedMenuIndex || !state.expandSidenav;
    return {
      ...state,
      expandSidenav: expantion,
      selectedMenuIndex: menuIndex,
      expandSub: expantion,
    };
  })
);

export const getExpandSidenav = (state: State) => state.expandSidenav;
export const getSelectedMenuIndex = (state: State) => state.selectedMenuIndex;
export const getExpandSub = (state: State) => state.expandSub;
