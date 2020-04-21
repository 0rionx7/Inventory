import { Component, OnInit } from '@angular/core';

import { SidenavService } from '../sidenav.service';
import { toggleArrowAnimations } from '../mainAnimations.';

@Component({
  selector: 'app-side-nav-sm',
  templateUrl: './side-nav-sm.component.html',
  styleUrls: ['./side-nav-sm.component.scss'],
  animations: toggleArrowAnimations,
})
export class SideNavSmComponent implements OnInit {
  icons = this.sidenavService.icons;
  toggle = 'right';

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {}

  onToggle(): void {
    this.toggle = this.toggle === 'right' ? 'left' : 'right';
    this.sidenavService.arrowClicked();
  }
}
