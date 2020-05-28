import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(loginform: NgForm) {
    this.authService.login({
      email: loginform.value.username,
      password: loginform.value.password,
    });
  }
}
