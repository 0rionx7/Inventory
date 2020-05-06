import { createAction, props } from '@ngrx/store';

export const iconClicked = createAction(
  '[Small SideNav] Icon Clicked',
  props<{ menuIndex: number }>()
);
