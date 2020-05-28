import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  login({ email, password }) {
    this.auth.signInWithEmailAndPassword(email, password).then(console.log);
  }
}
