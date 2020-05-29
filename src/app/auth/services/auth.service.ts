import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { from, Observable } from 'rxjs';

import { Credentials } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  login({
    username,
    password,
  }: Credentials): Observable<firebase.auth.UserCredential> {
    return from(this.auth.signInWithEmailAndPassword(username, password));
  }

  googleLogIn(): Observable<firebase.auth.UserCredential> {
    return from(
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    );
  }

  logOut(): void {
    this.auth.signOut().then((_) => console.log('Signed out'));
  }
}
