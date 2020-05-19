import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromSidenav from '../store/reducers';
import { ExpandedSidenavActions } from '../store/actions';

@Component({
  selector: 'app-active-route',
  template: `
    <div class="loaded-path">
      <mat-icon class="segment" routerLink="/">home</mat-icon>
      <div
        *ngFor="let segment of $currentUrl | async as path; index as i"
        [routerLink]="path.slice(0, i + 1).join('/')"
        (click)="onClick(segment)"
        class="segment"
      >
        <mat-icon *ngIf="segment">keyboard_arrow_right</mat-icon>
        {{ segment }}
      </div>
    </div>
  `,
  styles: [
    `
      .loaded-path {
        display: flex;
        align-items: center;
        padding: 10px 0 10px 30px;
      }
      .segment {
        display: flex;
        align-items: center;
        cursor: pointer;
        outline: none;
      }
    `,
  ],
})
export class ActiveRouteComponent implements OnInit {
  @Input() $currentUrl: Observable<string[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onClick(segment: string): void {
    this.store
      .pipe(select(fromSidenav.selectSidenavMenuItemByName, { name: segment }))
      .subscribe((id) =>
        this.store.dispatch(ExpandedSidenavActions.mainMenuClicked(id))
      );
  }
}
