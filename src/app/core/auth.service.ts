import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { authEndpoint } from './rest-const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(crendetials: { email: string; password: string }): Observable<any> {
    return this.http.post(authEndpoint, {
      ...crendetials,
      returnSecureToken: true,
    });
  }

  testSave(): Observable<any> {
    return this.http.patch(
      'https://firestore.googleapis.com/v1beta1/projects/angulargeohttp/databases/(default)/documents/user/alezzz',
      {
        name: '',
        fields: { name: { stringValue: 'sbemmmmmmm' } },
      }
    );
  }
}
