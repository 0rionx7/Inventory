import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { apiKey } from './rest-const';

@Injectable()
export class ReqInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const keyParam = request.params.set('key', apiKey);
    const clonedRequest = request.clone({ params: keyParam });

    return next.handle(clonedRequest);
  }
}
