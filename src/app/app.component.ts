import { Component, OnInit, HostListener } from '@angular/core';

import { mainContent } from './shared/mainAnimations.';
import { SidenavService } from './shared/sidenav.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: mainContent,
})
export class AppComponent implements OnInit {
  @HostListener('window:resize')
  onWindowChange() {
    this.pushMainContent = window.innerWidth > 620 && screen.availWidth > 420;
  }
  $show = this.sidenavService.expand;
  pushMainContent: boolean;
  loginDiag = false;
  editMenu = true;
  constructor(
    private sidenavService: SidenavService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pushMainContent = screen.availWidth < 420 ? false : true;
    this.route.url.subscribe(console.log);
  }
}
