import { createReducer, on } from '@ngrx/store';

import {
  ExpandedSidenavActions,
  SmallSidenavActions,
  SidenavApiActions,
  NavBarActions,
} from '../actions';
import { MenuItem } from '../../models/models';

export interface State {
  menuItems: MenuItem[];
  expandSidenav: boolean;
  expandSub: boolean;
  selectedMenuIndex: number;
  selectedSubIndex: number;
}

const initialState: State = {
  menuItems: [],
  expandSidenav: false,
  expandSub: null,
  selectedMenuIndex: null,
  selectedSubIndex: null,
};

export const reducer = createReducer(
  initialState,
  on(SidenavApiActions.setMenuItems, (state, { items }) => ({
    ...state,
    menuItems: items,
  })),
  on(ExpandedSidenavActions.mainMenuClicked, (state, { menuIndex }) => ({
    ...state,
    selectedMenuIndex: menuIndex,
    selectedSubIndex: null,
    expandSub: menuIndex !== state.selectedMenuIndex || !state.expandSub,
  })),
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
  on(ExpandedSidenavActions.subMenuClicked, (state, { subIndex }) => ({
    ...state,
    selectedSubIndex: subIndex,
  })),
  on(ExpandedSidenavActions.bottomArrowClicked, (state) => ({
    ...state,
    expandSidenav: !state.expandSidenav,
  })),
  on(NavBarActions.homeButtonClicked, (state) => ({
    ...state,
    expandSidenav: false,
  }))
);

export const getMenuItems = (state: State) => state.menuItems;
export const getExpandSidenav = (state: State) => state.expandSidenav;
export const getExpandSub = (state: State) => state.expandSub;
export const getSelectedMenuIndex = (state: State) => state.selectedMenuIndex;
export const getSelectedSubIndex = (state: State) => state.selectedSubIndex;
