import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(loginform: NgForm) {
    this.authService
      .login({
        email: loginform.value.username,
        password: loginform.value.password,
      })
      .subscribe(console.log);
  }

  onCancel() {}
}
