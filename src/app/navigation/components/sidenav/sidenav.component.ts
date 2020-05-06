import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { MenuItem } from '../../models/models';
import { sidenavAnimations } from 'src/app/shared/mainAnimations.';
import {
  ExpandedSidenavActions,
  SmallSidenavActions,
} from '../../store/actions';
import * as fromSidenav from '../../store/reducers';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: sidenavAnimations,
})
export class SidenavComponent implements OnInit {
  @Input() menuItems: MenuItem[];
  $selectedMenuIndex;
  $expandSidenav;
  $expandSub;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.$selectedMenuIndex = this.store.pipe(
      select(fromSidenav.selectSidenavSelectedMenuIndex)
    );
    this.$expandSidenav = this.store.pipe(
      select(fromSidenav.selectSidenavExpandSidenav)
    );
    this.$expandSub = this.store.pipe(
      select(fromSidenav.selectSidenavExpandSub)
    );
  }

  titleClicked(menuIndex: number) {
    this.store.dispatch(ExpandedSidenavActions.mainMenuClicked({ menuIndex }));
  }

  onIconClicked(menuIndex: number) {
    this.store.dispatch(SmallSidenavActions.iconClicked({ menuIndex }));
  }
}
