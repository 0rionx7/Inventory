import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

import { Observable } from 'rxjs';

import { sidenavAnimations } from '../shared/mainAnimations.';
import { MenuItem } from '../shared/models';

@Component({
  selector: 'app-side-nav-exp',
  template: `
    <div [@expandSidenav]="$show | async" class="side-nav-exp">
      <div [@contentVisibility]="$show | async">
        <app-side-nav-exp-content
          *ngFor="let menu of menuItems; index as i"
          [menuItem]="menu"
          [index]="i"
          [$chosen]="$chosen"
          (expandMenu)="expandMenu.emit($event)"
        ></app-side-nav-exp-content>
      </div>
      <div class="divider"></div>
      <div style="height:40px;cursor:pointer" (click)="closeNav.emit()"></div>
    </div>
  `,
  styles: [
    `
      .side-nav-exp {
        background-color: rgb(224, 197, 163);
        margin-top: 52px;
        height: calc(100vh - 52px);
        width: 255px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        white-space: nowrap;
      }
    `,
  ],
  animations: sidenavAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavExpComponent implements OnInit {
  @Input() menuItems: MenuItem;
  @Input() $chosen: Observable<number>;
  @Input() $show: Observable<boolean>;
  @Output() expandMenu = new EventEmitter<number>();
  @Output() closeNav = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}
}
