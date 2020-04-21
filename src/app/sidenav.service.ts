import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject } from 'rxjs';

import { MenuItem } from './models';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private _toggleExpantion = new BehaviorSubject<boolean>(false);
  expand = this._toggleExpantion.asObservable();
  private _toggleMenu = new Subject<number>();
  menu = this._toggleMenu.asObservable();
  icons = ['perm_identity', 'update', 'notification_important', 'phone'];
  menuItems: MenuItem[] = [
    { title: 'ALELELE', subMenus: ['adadasd', 'adasdasdasd', 'adadadads'] },
    { title: 'ALELELE', subMenus: ['adadasd', 'adasdasdasd', 'adadadads'] },
    { title: 'ALELELE', subMenus: ['adadasd', 'adasdasdasd', 'adadadads'] },
    { title: 'ALELELE', subMenus: ['adadasd', 'adasdasdasd', 'adadadads'] },
  ];
  toggle = false;
  expandedMenu: number;
  constructor() {}

  arrowClicked(): void {
    this._toggleExpantion.next((this.toggle = !this.toggle));
    this._toggleMenu.next((this.expandedMenu = null));
  }

  extraMenu(i: number): void {
    this.expandedMenu = this.expandedMenu !== i && i;
    this._toggleMenu.next(this.expandedMenu);
  }
}
