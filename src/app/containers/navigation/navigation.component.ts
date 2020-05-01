import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

import { SidenavService } from 'src/app/shared/sidenav.service';
import { MenuItem } from '../../shared/models';

@Component({
  selector: 'app-navigation',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-nav
      (showLogin)="onShowLogin()"
      (homeButton)="onHomeButton()"
      (showEditMenu)="showEditMenu.emit()"
    ></app-nav>
    <div class="side-nav">
      <app-side-nav-sm
        [selected]="($currentUrl | async) && ($currentUrl | async)[0]"
        [menuItems]="menuItems"
        [arrowToggle]="($expand | async) ? 'left' : 'right'"
        (arrowClicked)="onExpandSidenav()"
        (iconClicked)="onIconClicked($event)"
      ></app-side-nav-sm>
      <app-side-nav-exp
        [menuItems]="menuItems"
        [selected]="$currentUrl | async"
        [$expand]="$expand"
        (closeNav)="onExpandSidenav()"
      ></app-side-nav-exp>
    </div>
  `,
  styles: [
    `
      .side-nav {
        position: fixed;
        top: 52px;
        left: 0;
        display: flex;
        height: calc(100% - 52px);
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
