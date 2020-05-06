import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { MenuItem } from '../navigation/models/models';
import { menuItems } from '../navigation/models/menuItems';
import { SidenavService } from '../navigation/services/sidenav.service';

@Injectable({
  providedIn: 'root',
})
export class DataAccessService {
  constructor(
    private sidenavService: SidenavService,
    private firestore: AngularFirestore
  ) {}

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
          this.sidenavService.dynamicRoutes(menuItems);
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
}
