import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-active-route',
  template: `
    <div class="loaded-path">
      <mat-icon class="segment" routerLink="/">home</mat-icon>
      <div
        [routerLink]="segment"
        class="segment"
        *ngFor="let segment of $currentUrl | async"
      >
        <mat-icon>keyboard_arrow_right</mat-icon>
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
  @Input() $currentUrl: Observable<string>;

  constructor() {}

  ngOnInit(): void {}
}
