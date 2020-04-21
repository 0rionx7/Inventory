import { Component, OnInit } from '@angular/core';

import { sidenavAnimations } from '../mainAnimations.';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-side-nav-exp',
  templateUrl: './side-nav-exp.component.html',
  styleUrls: ['./side-nav-exp.component.scss'],
  animations: sidenavAnimations,
})
export class SideNavExpComponent implements OnInit {
  $show = this.sidenavService.expand;
  menuItems = this.sidenavService.menuItems;
  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {}

  onClick(): void {}
}
