import { Component, OnInit, HostListener } from '@angular/core';

import { mainContent } from './shared/mainAnimations.';
import { SidenavService } from './shared/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: mainContent,
})
export class AppComponent implements OnInit {
  @HostListener('window:resize')
  onWindowChange() {
    this.pushMainContent = window.innerWidth > 420 && screen.availWidth > 420;
  }
  $show = this.sidenavService.expand;
  pushMainContent: boolean;
  loginDiag = false;
  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.pushMainContent = screen.availWidth < 420 ? false : true;
  }

  onShowLogin(): void {
    this.loginDiag = !this.loginDiag;
  }
}
