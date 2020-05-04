import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MenuItem } from './models';
import { SubcontentComponent } from '../content/subcontent/subcontent.component';
import { MainContentComponent } from '../content/main-content/main-content.component';
import { TabComponent } from '../content/tab/tab.component';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private _expand = new BehaviorSubject<boolean>(false);
  expand: Observable<boolean> = this._expand.asObservable();
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

  sidenavIcon(title: string): void {
    this.toggle = this.url[0] === title ? !this.toggle : true;
    this._expand.next(this.toggle);
  }

  home(): void {
    this._expand.next((this.toggle = false));
  }

  dynamicRoutes(menuItems: MenuItem[]): void {
    const config = [];
    for (let i = 0; i < menuItems.length; i++) {
      const childs = [];
      for (let j = 0; j < menuItems[i].subMenus.length; j++) {
        childs.push({
          path: menuItems[i].subMenus[j],
          component: SubcontentComponent,
        });
      }
      config.push({
        path: menuItems[i].mainMenu,
        component: MainContentComponent,
        data: { no: i + 1 },
        children: childs,
      });
    }
    config.push({ path: 'tabs', component: TabComponent });
    this.router.resetConfig(config);
  }
}
