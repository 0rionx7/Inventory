import { createAction, props } from '@ngrx/store';

export const mainMenuClicked = createAction(
  '[Expanded SideNav] Main Menu Clicked',
  (menuIndex: number) => ({ menuIndex })
);
export const subMenuClicked = createAction(
  '[Expanded SideNav] Sub Menu Clicked',
  props<{ subIndex: number }>()
);
export const bottomArrowClicked = createAction(
  '[Expanded SideNav] Bottom Arrow Clicked'
);
export const closeSidenav = createAction('[App] Esc button Clicked');
