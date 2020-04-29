import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { toggleArrowAnimations } from '../shared/mainAnimations.';
import { MenuItem } from '../shared/models';

@Component({
  selector: 'app-side-nav-sm',
  template: `
    <div class="side-nav-sm">
      <div
        class="sm-icons"
        *ngFor="let menuItem of menuItems"
        (click)="iconClicked.emit(menuItem.mainMenu)"
        [routerLink]="menuItem.mainMenu"
        [style.backgroundColor]="
          menuItem.mainMenu === selected ? '#aa977e' : 'transparent'
        "
      >
        <mat-icon>{{ menuItem.icon }}</mat-icon>
      </div>
      <div class="divider"></div>
      <div (click)="arrowClicked.emit()" class="arrow">
        <a
          ><mat-icon
            [@toggleArrow]="{ value: arrowToggle, params: { ale: 0.3 } }"
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
        z-index: 2;
        height: 100%;
        width: 54px;
        overflow-y: auto;
        background-color: bisque;
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
        cursor: pointer;
        outline: none;
      }
    `,
  ],
  animations: toggleArrowAnimations,
})
export class SideNavSmComponent implements OnInit {
  @Output() arrowClicked = new EventEmitter<void>();
  @Output() iconClicked = new EventEmitter<string>();
  @Input() menuItems: MenuItem[];
  @Input() selected: string;
  @Input() arrowToggle: string;

  constructor() {}

  ngOnInit(): void {}
}
