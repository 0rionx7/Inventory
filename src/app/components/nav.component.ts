import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <div class="main-header">
      <mat-icon routerLink="/" (click)="this.homeButton.emit()">home</mat-icon>
      <div style="flex: 1;"></div>
      <div class="nav-el" (click)="this.showEditMenu.emit()">
        <span>Manage </span>
        <mat-icon>playlist_add</mat-icon>
      </div>
      <div class="nav-el" (click)="this.showLogin.emit()">
        <span>Login </span>
        <mat-icon>person</mat-icon>
      </div>
    </div>
  `,
  styles: [
    `
      .main-header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        width: 100%;
        height: 52px;
        padding: 0.5rem 1rem;
        background-color: #8b8e7f;
        box-shadow: 0px 2px 13px 1px rgba(0, 0, 0, 0.75);
      }

      .nav-el {
        display: flex;
        align-items: center;
        margin-left: 15px;
        font-weight: 500;
        cursor: pointer;
      }
      mat-icon {
        margin-left: 4px;
        cursor: pointer;
      }
    `,
  ],
})
export class NavComponent implements OnInit {
  @Output() showLogin = new EventEmitter();
  @Output() showEditMenu = new EventEmitter();
  @Output() homeButton = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
