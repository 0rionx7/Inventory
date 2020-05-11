import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { MenuItem } from '../models/models';
import { menuItems } from '../models/menuItems';
import { SubcontentComponent } from '../../content/subcontent/subcontent.component';
import { MainContentComponent } from '../../content/main-content/main-content.component';
import { TabComponent } from '../../content/tab/tab.component';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private _currentUrl = new BehaviorSubject<Array<string>>([]);
  currentUrl: Observable<Array<string>> = this._currentUrl.asObservable();

  constructor(private router: Router, private firestore: AngularFirestore) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects.split('/').splice(1);
        this._currentUrl.next(url);
      });
  }

  getMenuItems(): Observable<MenuItem[]> {
    const preferedMenu = 'sideMenu1';
    let menuItems: MenuItem[] = [];
    return this.firestore
      .collection('menuItems', (ref) =>
        ref.where(firebase.firestore.FieldPath.documentId(), '==', preferedMenu)
      )
      .snapshotChanges()
      .pipe(
        map((response) => {
          const data = response[0].payload.doc.data() as {
            [key: number]: MenuItem;
          };
          menuItems = [];
          for (const key in data) menuItems.push(data[key]);
          this.dynamicRoutes(menuItems);
          return menuItems;
        })
      );
    // setTimeout(() => this.toDataBase(), 1000);
  }

  saveToDataBase(): void {
    const localMenuItems = menuItems;
    for (let i = 0; i < localMenuItems.length; i++) {
      this.firestore
        .doc('menuItems/sideMenu1')
        .set({ [localMenuItems[i].id]: localMenuItems[i] }, { merge: true });
    }
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
