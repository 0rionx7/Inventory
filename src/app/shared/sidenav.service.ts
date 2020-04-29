import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private _toggleExpantion = new BehaviorSubject<boolean>(false);
  expand: Observable<boolean> = this._toggleExpantion.asObservable();
  private _currentUrl = new BehaviorSubject<Array<string>>([]);
  currentUrl: Observable<Array<string>> = this._currentUrl.asObservable();
  toggle = false;
  url: string[];
  constructor(private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.url = event.urlAfterRedirects.split('/').splice(1);
        this._currentUrl.next(this.url);
      });
  }

  arrowClicked(): void {
    this._toggleExpantion.next((this.toggle = !this.toggle));
  }

  sidenavIcon(title: string): void {
    this.toggle = this.url[0] === title ? !this.toggle : true;
    this._toggleExpantion.next(this.toggle);
  }

  home(): void {
    this._toggleExpantion.next((this.toggle = false));
  }
}
