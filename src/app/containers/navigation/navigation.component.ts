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
      (showEditMenu)="showEditMenu.emit()"
    ></app-nav>
    <div class="side-nav">
      <app-side-nav-sm
        [$selected]="$selected"
        [arrowToggle]="arrow"
        (arrowClicked)="onExpandSidenav()"
        (iconClicked)="onIconClicked($event)"
      ></app-side-nav-sm>
      <app-side-nav-exp
        [menuItems]="menuItems"
        [$selected]="$selected"
        [$expand]="$expand"
        (expandMenu)="onExpandMenu($event)"
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
  $selected = this.sidenavService.menu;
  $expand = this.sidenavService.expand;
  loginDiag = false;
  arrow = 'right';
  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {}

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
