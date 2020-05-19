import {
  createFeatureSelector,
  createSelector,
  Action,
  props,
} from '@ngrx/store';

import * as fromRoot from '../../../store/reducers';
import * as fromSidenav from './sidenav.reducer';
import { MenuItem } from '../../models/models';

export const navigationFeatureKey = 'sidenav';

export interface State extends fromRoot.State {
  [navigationFeatureKey]: fromSidenav.State;
}

export function reducers(state: fromSidenav.State | undefined, action: Action) {
  return fromSidenav.reducer(state, action);
}
// prettier-ignore
export const selectSidenavState = createFeatureSelector<State,fromSidenav.State>(navigationFeatureKey);

export const selectSidenavMenuItems = createSelector(
  selectSidenavState,
  fromSidenav.getMenuItems
);
export const selectSidenavExpandSidenav = createSelector(
  selectSidenavState,
  fromSidenav.getExpandSidenav
);
export const selectSidenavSelectedMenuIndex = createSelector(
  selectSidenavState,
  fromSidenav.getSelectedMenuIndex
);
export const selectSidenavSelectedSubIndex = createSelector(
  selectSidenavState,
  fromSidenav.getSelectedSubIndex
);
export const selectSidenavExpandSub = createSelector(
  selectSidenavState,
  fromSidenav.getExpandSub
);
export const selectSidenavMenuItemByName = createSelector(
  selectSidenavMenuItems,
  (menuItems: MenuItem[], props: { name: string }) =>
    menuItems.find((el) => el.mainMenu === props.name).id
);
