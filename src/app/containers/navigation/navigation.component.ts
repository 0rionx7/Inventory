import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { SidenavService } from 'src/app/shared/sidenav.service';

@Component({
  selector: 'app-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-nav (showLogin)="onShowLogin()"></app-nav>
    <app-side-nav-sm
      [$selected]="$selected"
      [arrowToggle]="arrow"
      (arrowClicked)="onExpandSidenav()"
      (iconClicked)="onIconClicked($event)"
    ></app-side-nav-sm>
    <app-side-nav-exp
      [$selected]="$selected"
      [$expand]="$expand"
      (expandMenu)="onExpandMenu($event)"
      (closeNav)="onExpandSidenav()"
    ></app-side-nav-exp>
  `,
})
export class NavigationComponent {
  @Output() showLogin = new EventEmitter<boolean>();
  $selected = this.sidenavService.menu;
  $expand = this.sidenavService.expand;
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
