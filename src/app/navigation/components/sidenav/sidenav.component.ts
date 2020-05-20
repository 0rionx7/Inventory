import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';
// prettier-ignore
import { ExpandedSidenavActions, SmallSidenavActions,} from '../../store/actions';
import { MenuItem } from '../../models/models';
import { sidenavAnimations } from 'src/app/core/mainAnimations.';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: sidenavAnimations,
})
export class SidenavComponent implements OnInit {
  @Input() menuItems: MenuItem[];
  @Input() selectedMenuIndex: number;
  @Input() selectedSubIndex: number;
  @Input() expandSidenav: boolean;
  @Input() expandSub: boolean;
  constructor(private store: Store) {}

  ngOnInit(): void {}

  onTitleClicked(menuIndex: number): void {
    this.store.dispatch(ExpandedSidenavActions.mainMenuClicked(menuIndex + 1));
  }

  onIconClicked(menuIndex: number): void {
    this.store.dispatch(SmallSidenavActions.iconClicked(menuIndex + 1));
  }

  onSubClicked(subIndex: number): void {
    this.store.dispatch(ExpandedSidenavActions.subMenuClicked({ subIndex }));
  }

  onClose() {
    this.store.dispatch(ExpandedSidenavActions.bottomArrowClicked());
  }

  isSelected(i: number): boolean {
    return this.selectedMenuIndex === i + 1;
  }

  isSExpanded(i: number): boolean {
    return this.isSelected(i) && this.expandSub && this.expandSidenav;
  }
}
