import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NoInterceptors extends HttpClient {
  constructor(private backend: HttpBackend) {
    super(backend);
  }
}
