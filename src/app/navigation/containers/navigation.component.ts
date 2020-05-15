import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MenuItem } from '../models/models';
import * as fromSidenav from '../store/reducers';
import { NavBarActions } from '../store/actions';

@Component({
  selector: 'app-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-nav
      (showLogin)="onShowLogin()"
      (showEditMenu)="showEditMenu.emit()"
      (homeButton)="onHomeButtonClicked()"
    ></app-nav>
    <app-sidenav
      [menuItems]="$menuItems | async"
      [selectedMenuIndex]="$selectedMenuIndex | async"
      [selectedSubIndex]="$selectedSubIndex | async"
      [expandSidenav]="$expandSidenav | async"
      [expandSub]="$expandSub | async"
    ></app-sidenav>
  `,
})
export class NavigationComponent {
  @Output() showLogin = new EventEmitter<boolean>();
  @Output() showEditMenu = new EventEmitter<boolean>();
  $menuItems: Observable<MenuItem[]>;
  $selectedMenuIndex: Observable<number>;
  $selectedSubIndex: Observable<number>;
  $expandSidenav: Observable<boolean>;
  $expandSub: Observable<boolean>;

  loginDiag = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.$menuItems = this.store.pipe(
      select(fromSidenav.selectSidenavMenuItems)
    );
    this.$selectedMenuIndex = this.store.pipe(
      select(fromSidenav.selectSidenavSelectedMenuIndex)
    );
    this.$selectedSubIndex = this.store.pipe(
      select(fromSidenav.selectSidenavSelectedSubIndex)
    );
    this.$expandSidenav = this.store.pipe(
      select(fromSidenav.selectSidenavExpandSidenav)
    );
    this.$expandSub = this.store.pipe(
      select(fromSidenav.selectSidenavExpandSub)
    );
  }

  onShowLogin(): void {
    this.showLogin.emit((this.loginDiag = !this.loginDiag));
  }

  onHomeButtonClicked(): void {
    this.store.dispatch(NavBarActions.homeButtonClicked());
  }
}
