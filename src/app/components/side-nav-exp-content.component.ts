import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { MenuItem } from '../shared/models';

@Component({
  selector: 'app-side-nav-exp-content',
  template: `
    <p
      [routerLink]="title"
      (click)="expandMenu.emit(index)"
      [style.backgroundColor]="
        index === ($selected | async) ? '#aa977e' : 'transparent'
      "
    >
      {{ title }}
    </p>
    <div *ngIf="index === ($selected | async)" style="margin-left: 30px;">
      <p *ngFor="let submenu of subMenus">{{ submenu }}</p>
    </div>
  `,
  styles: [
    `
      p {
        padding: 0 13px 0 13px;
        line-height: 24px;
        cursor: pointer;
      }
    `,
  ],
})
export class SideNavExpContentComponent implements OnInit {
  @Input() menuItem: MenuItem;
  @Input() index: number;
  @Input() $selected: Observable<number>;
  @Output() expandMenu = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  get title(): string {
    return this.menuItem.title;
  }

  get subMenus(): Array<string> {
    return this.menuItem.subMenus;
  }
}
