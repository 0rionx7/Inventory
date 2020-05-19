import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ROUTER_NAVIGATED, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private activatedRoute: ActivatedRoute
  ) {}

  navigationEnded$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        switchMap(() => {
          let route = this.activatedRoute;
          while (route.firstChild) route = route.firstChild;
          const pathUrls = route.pathFromRoot.map((route) => route.url);
          return merge(...pathUrls);
        })
        // tap(console.log)
      ),
    { dispatch: false }
  );
  navigationEnded2$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATION)
        // tap(console.log)
      ),
    { dispatch: false }
  );
}
