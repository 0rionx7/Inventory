import { Component, Output, EventEmitter, Input } from '@angular/core';

import { SidenavService } from 'src/app/shared/sidenav.service';
import { MenuItem } from '../../shared/models';

@Component({
  selector: 'app-navigation',
  template: `
    <app-nav
      (showLogin)="onShowLogin()"
      (homeButton)="onHomeButton()"
      (showEditMenu)="showEditMenu.emit()"
    ></app-nav>
    <app-sidenav
      [menuItems]="menuItems"
      [expand]="$expand | async"
      [selected]="$currentUrl | async"
      (iconClicked)="onIconClicked($event)"
      class="side-nav"
    ></app-sidenav>
  `,
  styles: [
    `
      .side-nav {
        position: fixed;
        top: 52px;
        left: 0;
        display: flex;
        height: calc(100% - 52px);
        z-index: 10;
      }
    `,
  ],
})
export class NavigationComponent {
  @Output() showLogin = new EventEmitter<boolean>();
  @Output() showEditMenu = new EventEmitter<boolean>();
  @Input() menuItems: MenuItem[];
  $expand = this.sidenavService.expand;
  $currentUrl = this.sidenavService.currentUrl;
  loginDiag = false;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {}

  onShowLogin(): void {
    this.showLogin.emit((this.loginDiag = !this.loginDiag));
  }

  onHomeButton(): void {
    this.sidenavService.home();
  }

  onExpandSidenav(): void {
    this.sidenavService.arrowClicked();
  }

  onIconClicked(title: string): void {
    this.sidenavService.sidenavIcon(title);
  }
}
