import { Component, OnInit, HostListener } from '@angular/core';

import { MenuItem } from './shared/models';
import { SidenavService } from './shared/sidenav.service';
import { DataAccessService } from './shared/data-access.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostListener('window:resize')
  onWindowChange() {
    this.pushMainContent = screen.availWidth > 420;
  }
  menuItems: MenuItem[];
  $expand = this.sidenavService.expand;
  $currentUrl = this.sidenavService.currentUrl;
  pushMainContent: boolean;
  loginDiag = false;
  editMenu = false;
  constructor(
    private sidenavService: SidenavService,
    private dataBase: DataAccessService
  ) {}

  ngOnInit(): void {
    this.pushMainContent = screen.availWidth > 420;
    this.dataBase.getMenuItems().subscribe((data) => (this.menuItems = data));
  }
}
