import { Component, Output, EventEmitter } from '@angular/core';

import { SidenavService } from 'src/app/shared/sidenav.service';
import { menuItems, icons } from 'src/app/shared/menuItems';

@Component({
  selector: 'app-navigation',
  template: `
    <app-nav (showLogin)="onShowLogin()"></app-nav>
    <div style="display:flex">
      <app-side-nav-sm
        [$chosen]="$chosen"
        [icons]="icons"
        [toggle]="arrow"
        (arrowClicked)="onExpandSidenav()"
        (iconClicked)="onIconClicked($event)"
      ></app-side-nav-sm>
      <app-side-nav-exp
        [$chosen]="$chosen"
        [menuItems]="menuItems"
        [$show]="$show"
        (expandMenu)="onExpandMenu($event)"
        (closeNav)="onExpandSidenav()"
      ></app-side-nav-exp>
    </div>
  `,
})
export class NavigationComponent {
  @Output() showLogin = new EventEmitter<boolean>();
  $chosen = this.sidenavService.menu;
  $show = this.sidenavService.expand;
  menuItems = menuItems;
  icons = icons;
  loginDiag = false;
  arrow = 'right';
  constructor(private sidenavService: SidenavService) {}

  onShowLogin(): void {
    this.showLogin.emit((this.loginDiag = !this.loginDiag));
  }

  onExpandMenu(index: number): void {
    this.sidenavService.extraMenu(index);
  }

  onExpandSidenav() {
    this.arrow = this.arrow === 'right' ? 'left' : 'right';
    this.sidenavService.arrowClicked();
  }

  onIconClicked(index: number): void {
    this.arrow = 'left';
    this.sidenavService.sidenavIcon(index);
  }
}
