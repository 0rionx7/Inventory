import { Component, OnInit } from '@angular/core';

import { mainContent } from './shared/mainAnimations.';
import { SidenavService } from './shared/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: mainContent,
})
export class AppComponent implements OnInit {
  $show = this.sidenavService.expand;
  desktop = true;
  loginDiag = false;
  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.desktop = window.innerWidth < 420 ? false : true;
  }

  onShowLogin(): void {
    this.loginDiag = !this.loginDiag;
  }
}
