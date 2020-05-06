import { createAction, props } from '@ngrx/store';

export const mainMenuClicked = createAction(
  '[Expanded SideNav] Main Menu Clicked',
  props<{ menuIndex: number }>()
);
export const subMenuClicked = createAction(
  '[Expanded SideNav] Sub Menu Clicked'
);
