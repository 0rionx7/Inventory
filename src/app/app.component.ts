import { Component, OnInit, HostListener } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromSidenav from './navigation/store/reducers';
import { SidenavService } from './navigation/services/sidenav.service';

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
  $expandSidenav: Observable<boolean>;
  $currentUrl = this.sidenavService.currentUrl;
  pushMainContent: boolean;
  loginDiag = false;
  editMenu = false;
  constructor(private store: Store, private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.pushMainContent = screen.availWidth > 420;
    this.$expandSidenav = this.store.pipe(
      select(fromSidenav.selectSidenavExpandSidenav)
    );
  }
}
