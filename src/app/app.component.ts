import { Component, OnInit, HostListener } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { SidenavService } from './shared/sidenav.service';
import { menuItems } from './shared/menuItems';
import { MenuItem } from './shared/models';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { MainContentComponent } from './content/main-content/main-content.component';
import { SubcontentComponent } from './content/subcontent/subcontent.component';
import { TabComponent } from './content/tab/tab.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostListener('window:resize')
  onWindowChange() {
    this.pushMainContent = window.innerWidth > 620 && screen.availWidth > 420;
  }
  menuItems: MenuItem[];
  $show = this.sidenavService.expand;
  pushMainContent: boolean;
  loginDiag = false;
  editMenu = false;
  loading = true;
  constructor(
    private sidenavService: SidenavService,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pushMainContent = screen.availWidth > 420;
    const preferedMenu = 'sideMenu1';
    this.firestore
      .collection('menuItems', (ref) =>
        ref.where(firebase.firestore.FieldPath.documentId(), '==', preferedMenu)
      )
      .snapshotChanges()
      .pipe(map((data) => data[0].payload.doc.data() as {}))
      .subscribe((data) => {
        this.menuItems = [];
        for (const key in data) this.menuItems.push({ ...data[key] });
        this.dynamicRoutes();
        this.loading = false;
      });
    // setTimeout(() => this.toDataBase(), 1000);
  }

  dynamicRoutes(): void {
    const config = [];
    for (let i = 0; i < this.menuItems.length; i++) {
      const childs = [];
      for (let j = 0; j < this.menuItems[i].subMenus.length; j++) {
        childs.push({
          path: this.menuItems[i].subMenus[j],
          component: SubcontentComponent,
        });
      }
      config.push({
        path: this.menuItems[i].mainMenu,
        component: MainContentComponent,
        data: { no: i + 1 },
        children: childs,
      });
    }
    config.push({ path: 'tabs', component: TabComponent });
    this.router.resetConfig(config);
  }

  toDataBase(): void {
    const localMenuItems = menuItems;
    for (let i = 0; i < localMenuItems.length; i++) {
      this.firestore
        .doc('menuItems/sideMenu1')
        .set({ [localMenuItems[i].id]: localMenuItems[i] }, { merge: true });
    }
  }
}
