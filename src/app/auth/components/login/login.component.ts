import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Credentials } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() submitted = new EventEmitter<Credentials | null>();
  @Output() cancel = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  onSubmit(loginform: NgForm): void {
    this.submitted.emit(loginform.value);
  }

  googleSignIn(): void {
    this.submitted.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
