import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loginDiag = false;
  constructor() {}

  onShowLogin(): void {
    this.loginDiag = !this.loginDiag;
  }
}
