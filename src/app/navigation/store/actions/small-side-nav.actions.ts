import { createAction } from '@ngrx/store';

export const iconClicked = createAction(
  '[Small SideNav] Icon Clicked',
  (index: number) => ({ menuIndex: index })
);
