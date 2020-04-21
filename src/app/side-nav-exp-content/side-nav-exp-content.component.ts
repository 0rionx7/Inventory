import { Component, OnInit, Input } from '@angular/core';

import { MenuItem } from '../models';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-side-nav-exp-content',
  templateUrl: './side-nav-exp-content.component.html',
  styleUrls: ['./side-nav-exp-content.component.scss'],
})
export class SideNavExpContentComponent implements OnInit {
  @Input() menuItem: MenuItem;
  @Input() index: number;
  $chosen = this.sidenavService.menu;
  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {}

  onClick(): void {
    this.sidenavService.extraMenu(this.index);
  }
}
