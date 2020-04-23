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
  @HostListener('window:orientationchange')
  onOrientationChange() {
    this.pushMainContent = screen.availWidth < 420 ? false : true;
  }
  @HostListener('window:resize')
  onWindowResize() {
    this.pushMainContent = window.innerWidth < 820 ? false : true;
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
