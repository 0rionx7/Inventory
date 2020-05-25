import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';

import { CartActions } from '../../book/store/actions';

@Component({
  selector: 'app-nav',
  template: `
    <div class="main-header">
      <button class="toggle-button">
        <span class="toggle-button__bar"></span>
        <span class="toggle-button__bar"></span>
        <span class="toggle-button__bar"></span>
      </button>
      <div class="header-content">
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
        <div class="nav-el" routerLink="ShoppingCart" (click)="onClick()">
          <span>Cart </span>
          <mat-icon>add_shopping_cart</mat-icon>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .main-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        width: 100%;
        height: 52px;
        padding: 0.5rem 1rem;
        background-color: #8b8e7f;
        box-shadow: 1px 1px 9px 4px rgba(0, 0, 0, 0.75);
      }
      .header-content {
        display: none;
      }
      @media (min-width: 40rem) {
        .header-content {
          display: flex;
          align-items: center;
        }
        .toggle-button {
          display: none;
        }
      }
      .toggle-button {
        width: 1.5rem;
        background: transparent;
        border: none;
        cursor: pointer;
        padding-top: 0;
        padding-bottom: 0;
      }

      .toggle-button:focus {
        outline: none;
      }

      .toggle-button__bar {
        width: 100%;
        height: 0.15rem;
        background: black;
        display: block;
        margin: 0.3rem 0;
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

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onClick() {
    this.store.dispatch(CartActions.showCart());
    // this.store.dispatch(CartActions.checkOut());
  }
}
