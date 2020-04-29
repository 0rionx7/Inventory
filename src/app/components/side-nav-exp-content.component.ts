import { Component, OnInit, Input } from '@angular/core';

import { MenuItem } from '../shared/models';
import { subContent } from '../shared/mainAnimations.';

@Component({
  selector: 'app-side-nav-exp-content',
  template: `
    <div
      class="menu-title"
      [style.backgroundColor]="
        menuItem.mainMenu === selected[0] ? '#aa977e' : 'transparent'
      "
    >
      <p [routerLink]="title" class="title">
        {{ title }}
      </p>
      <mat-icon
        *ngIf="menuItem.subMenus.length !== 0"
        [@subArrow]="menuItem.mainMenu === selected[0] ? 'down' : 'right'"
        style="margin-right: 13px;"
        >keyboard_arrow_right</mat-icon
      >
    </div>
    <div
      *ngIf="menuItem.mainMenu === selected[0]"
      @subContent
      style="margin-left: 30px; overflow: hidden;"
    >
      <p
        *ngFor="let submenu of subMenus"
        [routerLink]="[title, submenu]"
        [state]="{ main: title, sub: submenu }"
        class="sub"
        [style.backgroundColor]="
          submenu === selected[1] ? '#aa977e' : 'transparent'
        "
      >
        {{ submenu }}
      </p>
    </div>
  `,
  styles: [
    `
      .menu-title {
        display: flex;
        justify-content: space-between;
        margin: 1em 0 1em;
      }
      p {
        padding: 0 13px 0 13px;
        line-height: 24px;
        cursor: pointer;
        outline: none;
      }
      p:first-child.sub {
        margin-top: 0;
      }
      p:last-child.sub {
        margin-bottom: 0;
      }
      .title {
        margin: 0;
      }
    `,
  ],
  animations: subContent,
})
export class SideNavExpContentComponent implements OnInit {
  @Input() menuItem: MenuItem;
  @Input() selected: string[];
  constructor() {}

  ngOnInit(): void {}

  get title(): string {
    return this.menuItem.mainMenu;
  }

  get subMenus(): Array<string> {
    return this.menuItem.subMenus;
  }
}
