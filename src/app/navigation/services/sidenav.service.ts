import { Injectable } from '@angular/core';
import { Router, Route } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { MenuItem } from '../models/models';
import { menuItems } from '../models/menuItems';
import { SubcontentComponent } from '../../core/content/subcontent/subcontent.component';
import { MainContentComponent } from '../../core/content/main-content/main-content.component';
import { TabComponent } from '../../core/content/tab/tab.component';
import { BooksComponent } from 'src/app/book/components/books.component';
import { DataResolver } from '../../core/data.resolver';
import { CartComponent } from 'src/app/book/components/cart/cart.component';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  constructor(private router: Router, private afs: AngularFirestore) {}

  getMenuItems(): Observable<MenuItem[]> {
    const preferedMenu = 'sideMenu1';
    let menuItems: MenuItem[] = [];
    // setTimeout(() => this.saveToDataBase(), 1000);
    return this.afs
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
  }

  saveToDataBase(): void {
    const localMenuItems = menuItems;
    for (let i = 0; i < localMenuItems.length; i++) {
      this.afs
        .doc('menuItems/sideMenu1')
        .set({ [localMenuItems[i].id]: localMenuItems[i] }, { merge: true });
    }
  }
  dynamicRoutes(menuItems: MenuItem[]): void {
    const config: Route[] = [];
    config.push({
      path: 'ShoppingCart',
      component: CartComponent,
    });
    config.push({
      path: 'MainMenu1',
      component: BooksComponent,
      resolve: { items: DataResolver },
    });
    config.push({
      path: 'MainMenu2',
      loadChildren: () =>
        import('../../albums/albums.module').then((m) => m.AlbumsModule),
      resolve: { items: DataResolver },
    });
    for (let i = 2; i < menuItems.length; i++) {
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
