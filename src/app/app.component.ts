import { Component, OnInit, HostListener } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { mainContent } from './shared/mainAnimations.';
import { SidenavService } from './shared/sidenav.service';
import { MenuItem } from './shared/models';
import { menuItems } from './shared/menuItems';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: mainContent,
})
export class AppComponent implements OnInit {
  @HostListener('window:resize')
  onWindowChange() {
    this.pushMainContent = window.innerWidth > 620 && screen.availWidth > 420;
  }
  menuItems: MenuItem;
  $show = this.sidenavService.expand;
  pushMainContent: boolean;
  loginDiag = false;
  editMenu = true;
  constructor(
    private sidenavService: SidenavService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.pushMainContent = screen.availWidth < 420 ? false : true;
    // this.firestore.doc('menuItems/sideMenu').set({ menuItems: menuItems });
    this.firestore
      .collection('menuItems')
      .snapshotChanges()
      .pipe(map((data) => data[0].payload.doc.data()['menuItems']))
      .subscribe((data) => (this.menuItems = data));
  }
}
