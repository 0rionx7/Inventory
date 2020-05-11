import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import {
  Actions,
  ofType,
  createEffect,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { SidenavService } from '../../navigation/services/sidenav.service';
import { MenuItem } from 'src/app/navigation/models/models';
import { SidenavApiActions } from 'src/app/navigation/store/actions';

@Injectable()
export class RootEffects {
  constructor(
    private action$: Actions,
    private sidenavService: SidenavService
  ) {}

  init$ = createEffect(() =>
    this.action$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() =>
        this.sidenavService.getMenuItems().pipe(
          map((menuItems: MenuItem[]) =>
            SidenavApiActions.setMenuItems({ items: menuItems })
          ),
          catchError((error: HttpErrorResponse) =>
            of(SidenavApiActions.fetchError({ msg: error.error }))
          )
        )
      )
    )
  );
}
