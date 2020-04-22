import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { toggleArrowAnimations } from '../shared/mainAnimations.';
import { icons, menuItems } from '../shared/menuItems';
import { MenuItem } from '../shared/models';

@Component({
  selector: 'app-side-nav-sm',
  template: `
    <div class="side-nav-sm">
      <div
        class="sm-icons"
        *ngFor="let icon of icons; index as i"
        [routerLink]="menuItems[i]?.title"
        [style.backgroundColor]="
          i === ($selected | async) ? '#aa977e' : 'transparent'
        "
      >
        <mat-icon (click)="iconClicked.emit(i)">{{ icon }}</mat-icon>
      </div>
      <div class="divider"></div>
      <div (click)="arrowClicked.emit()" class="arrow">
        <a
          ><mat-icon [@toggleArrow]="arrowToggle"
            >keyboard_arrow_right</mat-icon
          ></a
        >
      </div>
    </div>
  `,
  styles: [
    `
      .side-nav-sm {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
        top: 52px;
        left: 0;
        z-index: 2;
        height: calc(100% - 52px);
        width: 54px;
        background-color: bisque;
        overflow-y: auto;
      }

      .arrow {
        cursor: pointer;
        align-self: stretch;
        text-align: center;
      }

      .sm-icons {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: stretch;
        margin-top: 16px;
      }

      mat-icon {
        cursor: pointer;
      }
    `,
  ],
  animations: toggleArrowAnimations,
})
export class SideNavSmComponent implements OnInit {
  @Input() $selected: Observable<number>;
  @Input() arrowToggle: string;
  @Output() arrowClicked = new EventEmitter<void>();
  @Output() iconClicked = new EventEmitter<number>();
  icons: Array<string> = icons;
  menuItems: MenuItem[] = menuItems;

  constructor() {}

  ngOnInit(): void {}
}
