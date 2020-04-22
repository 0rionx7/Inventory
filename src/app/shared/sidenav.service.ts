import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private _toggleExpantion = new BehaviorSubject<boolean>(false);
  expand: Observable<boolean> = this._toggleExpantion.asObservable();
  private _toggleMenu = new BehaviorSubject<number>(null);
  menu: Observable<number> = this._toggleMenu.asObservable();
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

  sidenavIcon(index: number): void {
    this._toggleExpantion.next((this.toggle = true));
    this._toggleMenu.next((this.expandedMenu = index));
  }
}
