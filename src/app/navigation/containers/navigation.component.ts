import { Component, Output, EventEmitter, Input } from '@angular/core';

import { SidenavService } from 'src/app/navigation/services/sidenav.service';
import { MenuItem } from '../models/models';

@Component({
  selector: 'app-navigation',
  template: `
    <app-nav
      (showLogin)="onShowLogin()"
      (homeButton)="onHomeButton()"
      (showEditMenu)="showEditMenu.emit()"
    ></app-nav>
    <app-sidenav [menuItems]="menuItems" class="side-nav"></app-sidenav>
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
  loginDiag = false;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {}

  onShowLogin(): void {
    this.showLogin.emit((this.loginDiag = !this.loginDiag));
  }

  onHomeButton(): void {
    this.sidenavService.home();
  }
}
