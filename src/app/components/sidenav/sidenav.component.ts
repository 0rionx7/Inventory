import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MenuItem } from '../../shared/models';
import { sidenavAnimations } from 'src/app/shared/mainAnimations.';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: sidenavAnimations,
})
export class SidenavComponent implements OnInit {
  @Output() iconClicked = new EventEmitter<string>();
  @Input() menuItems: MenuItem[];
  @Input() selected: string[];
  @Input() expand: boolean;
  openSub = true;
  constructor() {}

  ngOnInit(): void {}

  titleClicked(title: string) {
    this.openSub = title === this.selected[0] ? !this.openSub : true;
  }
}
