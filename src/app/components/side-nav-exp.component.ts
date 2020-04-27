import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { MenuItem } from '../shared/models';
import { sidenavAnimations } from '../shared/mainAnimations.';

@Component({
  selector: 'app-side-nav-exp',
  template: `
    <div [@expandSidenav]="$expand | async" class="side-nav-exp">
      <div [@contentVisibility]="$expand | async">
        <app-side-nav-exp-content
          *ngFor="let menuItem of menuItems; index as i"
          [menuItem]="menuItem"
          [index]="i"
          [$selected]="$selected"
          (expandMenu)="expandMenu.emit($event)"
        ></app-side-nav-exp-content>
      </div>
      <div class="divider"></div>
      <div class="arrow" (click)="closeNav.emit()">
        <mat-icon style="margin: 8px;">keyboard_arrow_left</mat-icon>
      </div>
    </div>
  `,
  styles: [
    `
      .side-nav-exp {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 255px;
        white-space: nowrap;
        overflow: hidden;
        overflow-y: auto;
        background-color: rgb(224, 197, 163);
      }
      .arrow {
        height: 40px;
        cursor: pointer;
        text-align: center;
      }
    `,
  ],
  animations: sidenavAnimations,
})
export class SideNavExpComponent implements OnInit {
  @Input() menuItems: MenuItem[];
  @Input() $selected: Observable<number>;
  @Input() $expand: Observable<boolean>;
  @Output() expandMenu = new EventEmitter<number>();
  @Output() closeNav = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
}
