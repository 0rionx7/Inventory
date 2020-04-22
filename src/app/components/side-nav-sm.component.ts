import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { toggleArrowAnimations } from '../shared/mainAnimations.';

@Component({
  selector: 'app-side-nav-sm',
  template: `
    <div class="side-nav-sm">
      <div
        class="sm-icons"
        *ngFor="let icon of icons; index as i"
        [style.backgroundColor]="
          i === ($chosen | async) ? '#aa977e' : 'transparent'
        "
      >
        <mat-icon (click)="iconClicked.emit(i)">{{ icon }}</mat-icon>
      </div>
      <div class="divider"></div>
      <div (click)="arrowClicked.emit()" class="arrow">
        <a><mat-icon [@toggleArrow]="toggle">keyboard_arrow_right</mat-icon></a>
      </div>
    </div>
  `,
  styles: [
    `
      .side-nav-sm {
        background-color: bisque;
        margin-top: 52px;
        height: calc(100vh - 52px);
        width: 54px;
        display: flex;
        flex-direction: column;
        align-items: center;
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
  @Input() $chosen: Observable<number>;
  @Input() icons: Array<string>;
  @Input() toggle: string;
  @Output() arrowClicked = new EventEmitter<void>();
  @Output() iconClicked = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
}
