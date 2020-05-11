import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

@Injectable()
export class SidenavEffects {
  constructor(private action$: Actions) {}
}
