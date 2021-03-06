import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { transition, style, animate, trigger } from '@angular/animations';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CartActions } from 'src/app/book/store/actions';
import * as fromCart from 'src/app/book/store/reducers';

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
        <div class="dropDown">
          <div
            class="nav-el "
            style="flex: 1 0 auto;"
            (click)="showEditMenu.emit(); subMenu = !subMenu"
            (mouseenter)="subMenu = !subMenu"
          >
            <span>Manage </span>
            <mat-icon>playlist_add</mat-icon>
          </div>
          <div @dd class="dd-menu" *ngIf="subMenu">
            <ul style="margin: 10px;">
              <li>Link 1</li>
              <li>Link 1</li>
              <li>Link 1</li>
            </ul>
          </div>
        </div>
        <!-- <div
          class="nav-el"
          routerLink="/tabs"
          [state]="{ tabs: ['LogIn', 'SignUp'] }"
        >
          <span>Tabs </span>
        </div> -->
        <div class="nav-el" (click)="showLogin.emit()">
          Log In<mat-icon>how_to_reg</mat-icon>
        </div>
        <div class="nav-el cart" routerLink="ShoppingCart" (click)="showCart()">
          <span>Cart </span>
          <mat-icon>add_shopping_cart</mat-icon
          ><span class="total">{{ count$ | async }}</span>
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
      .dropDown {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 115px;
      }
      .dd-menu {
        flex: 1 0 auto;
        width: 250px;
        height: 150px;
        margin-top: 0.5rem;
        overflow: hidden;
        border-radius: 5px;
        background-color: #476d72ef;
      }
      @media (min-width: 40rem) {
        .header-content {
          display: flex;
          align-items: center;
          height: 100%;
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
        height: 100%;
        margin-left: 15px;
        font-weight: 500;
        cursor: pointer;
      }
      .cart {
        padding: 5px;
        background-color: var(--main-color);
        border-radius: 10px;
      }
      mat-icon {
        margin-left: 4px;
        cursor: pointer;
      }
      ul {
        list-style-position: inside;
      }
      .total {
        width: 29px;
        padding: 5px;
        text-align: center;
        border-radius: 10px;
        background-color: #222425;
        color: wheat;
      }
    `,
  ],
  animations: [
    trigger('dd', [
      transition(':enter', [style({ height: 0 }), animate('0.3s ease-in')]),
      transition(':leave', [animate('0.3s ease-in'), style({ height: 0 })]),
    ]),
  ],
})
export class NavComponent implements OnInit {
  @Output() showLogin = new EventEmitter();
  @Output() showEditMenu = new EventEmitter();
  @Output() homeButton = new EventEmitter();
  count$: Observable<number>;
  subMenu = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.count$ = this.store.pipe(select(fromCart.selectTotalItems));
  }

  showCart(): void {
    this.store.dispatch(CartActions.showCart());
  }
}
