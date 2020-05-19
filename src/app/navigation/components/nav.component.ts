import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';

import { SidenavService } from '../services/sidenav.service';
import { CartActions } from '../../book/store/actions';

@Component({
  selector: 'app-nav',
  template: `
    <div class="main-header">
      <mat-icon routerLink="/" (click)="homeButton.emit()">home</mat-icon>
      <div style="flex: 1;"></div>
      <div class="nav-el" (click)="showEditMenu.emit()">
        <span>Manage </span>
        <mat-icon>playlist_add</mat-icon>
      </div>
      <div
        class="nav-el"
        routerLink="/tabs"
        [state]="{ tabs: ['LogIn', 'SignUp'] }"
      >
        <span>Tabs </span>
      </div>
      <div class="nav-el" (click)="onClick()">
        <span>Login </span>
        <mat-icon>person</mat-icon>
      </div>
    </div>
  `,
  styles: [
    `
      .main-header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        width: 100%;
        height: 52px;
        padding: 0.5rem 1rem;
        background-color: #8b8e7f;
        box-shadow: 1px 1px 9px 4px rgba(0, 0, 0, 0.75);
      }

      .nav-el {
        display: flex;
        align-items: center;
        margin-left: 15px;
        font-weight: 500;
        cursor: pointer;
      }
      mat-icon {
        margin-left: 4px;
        cursor: pointer;
      }
    `,
  ],
})
export class NavComponent implements OnInit {
  @Output() showLogin = new EventEmitter();
  @Output() showEditMenu = new EventEmitter();
  @Output() homeButton = new EventEmitter();

  constructor(private navService: SidenavService, private store: Store) {}

  ngOnInit(): void {}

  onClick() {
    this.store.dispatch(CartActions.checkOut());
  }
}
