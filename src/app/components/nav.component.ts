import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <div class="main-header">
      <div style="flex: 1;"></div>
      <div class="login-btn" (click)="this.showLogin.emit()">
        <span>Login </span>
        <mat-icon>person</mat-icon>
      </div>
    </div>
  `,
  styles: [
    `
      .main-header {
        width: 100%;
        height: 52px;
        padding: 0.5rem 1rem;
        background-color: #8b8e7f;
        box-shadow: 0px 2px 13px 1px rgba(0, 0, 0, 0.75);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2;
        display: flex;
        align-items: center;
      }

      .login-btn {
        font-weight: 500;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    `,
  ],
})
export class NavComponent implements OnInit {
  @Output() showLogin = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
