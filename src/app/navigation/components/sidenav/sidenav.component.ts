import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { MenuItem } from '../../models/models';
import { sidenavAnimations } from 'src/app/shared/mainAnimations.';
import { mainMenuClicked } from '../../store/actions/expanded-sidenav.actions';

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
  constructor(private store: Store) {}

  ngOnInit(): void {}

  titleClicked(title: string, mainMenu) {
    this.store.dispatch(mainMenuClicked({ mainMenu }));
    this.openSub = title === this.selected[0] ? !this.openSub : true;
  }

  onIconClicked(title: string) {
    this.iconClicked.emit(title);
    if (title === this.selected[0] && !this.openSub) this.openSub = true;
  }
}
