import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ROUTER_NAVIGATED, ROUTER_REQUEST } from '@ngrx/router-store';
import { switchMap, tap, map, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private activatedRoute: ActivatedRoute
  ) {}

  navigationEnded$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_REQUEST),
        tap((_) => console.log('INSIDE')),
        map((sd: Action) => {
          console.log(sd['payload'].routerState.url);
          let route = this.activatedRoute;
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((asd) => asd.url),
        tap((x) => console.log(x))
      ),
    { dispatch: false }
  );
}
