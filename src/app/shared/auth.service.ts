import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { authEndpoint } from './rest-const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(crendetials: { email: string; password: string }) {
    return this.http.post(authEndpoint, {
      ...crendetials,
      returnSecureToken: true,
    });
  }

  store() {
    return this.http.patch(
      'https://firestore.googleapis.com/v1beta1/projects/angulargeohttp/databases/(default)/documents/user/alezzz',
      {
        name: '',
        fields: { name: { stringValue: 'sbemmmmmmm' } },
      }
    );
  }
}
