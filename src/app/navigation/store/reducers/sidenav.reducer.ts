import { createReducer, on, Action } from '@ngrx/store';

import { ExpandedSidenavActions, SmallSidenavActions } from '../actions';

export interface State {
  expandSidenav: boolean;
  expandSub: boolean;
  selectedMenuIndex: number;
  selectedSubIndex: number;
}

const initialState: State = {
  expandSidenav: false,
  expandSub: null,
  selectedMenuIndex: null,
  selectedSubIndex: null,
};

export const reducer = createReducer(
  initialState,
  on(ExpandedSidenavActions.mainMenuClicked, (state, { menuIndex }) => {
    return {
      ...state,
      selectedMenuIndex: menuIndex,
      selectedSubIndex: null,
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
      selectedSubIndex: null,
      expandSub: expantion,
    };
  }),
  on(ExpandedSidenavActions.subMenuClicked, (state, { subIndex }) => {
    return {
      ...state,
      selectedSubIndex: subIndex,
    };
  })
);

export const getExpandSidenav = (state: State) => state.expandSidenav;
export const getExpandSub = (state: State) => state.expandSub;
export const getSelectedMenuIndex = (state: State) => state.selectedMenuIndex;
export const getSelectedSubIndex = (state: State) => state.selectedSubIndex;
