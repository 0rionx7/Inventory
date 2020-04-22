import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { MenuItem } from '../shared/models';

@Component({
  selector: 'app-side-nav-exp-content',
  template: `
    <p
      (click)="expandMenu.emit(index)"
      [style.backgroundColor]="
        index === ($chosen | async) ? '#aa977e' : 'transparent'
      "
    >
      {{ menuItem.title }}
    </p>
    <div *ngIf="index === ($chosen | async)" style="margin-left: 30px;">
      <p *ngFor="let submenu of menuItem.subMenus">{{ submenu }}</p>
    </div>
  `,
  styles: [
    `
      p {
        line-height: 24px;
        cursor: pointer;
        padding: 0 13px 0 13px;
      }
    `,
  ],
})
export class SideNavExpContentComponent implements OnInit {
  @Input() menuItem: MenuItem;
  @Input() index: number;
  @Input() $chosen: Observable<number>;
  @Output() expandMenu = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}
}
