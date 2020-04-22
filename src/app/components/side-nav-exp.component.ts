import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Observable } from 'rxjs';

import { sidenavAnimations } from '../shared/mainAnimations.';
import { MenuItem } from '../shared/models';
import { menuItems } from '../shared/menuItems';

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
        position: fixed;
        top: 52px;
        left: 54px;
        height: calc(100% - 52px);
        width: 255px;
        background-color: rgb(224, 197, 163);
        white-space: nowrap;
        overflow: hidden;
        overflow-y: auto;
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
  @Input() $selected: Observable<number>;
  @Input() $expand: Observable<boolean>;
  @Output() expandMenu = new EventEmitter<number>();
  @Output() closeNav = new EventEmitter<void>();
  menuItems: MenuItem[] = menuItems;
  constructor() {}

  ngOnInit(): void {}
}
