import { createAction, props } from '@ngrx/store';

import { MenuItem } from '../../models/menuItem';

export const setMenuItems = createAction(
  '[Sidenav Api] Set MenuItems',
  props<{ items: MenuItem[] }>()
);
export const fetchError = createAction(
  '[Sidenav Api] Fetched Failed',
  props<{ msg: any }>()
);
