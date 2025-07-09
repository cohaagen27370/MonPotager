import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { globalStore } from './global.store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  globalStore = inject(globalStore);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.globalStore.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.globalStore.token(),
        },
      });

      return next.handle(req);
    }

    req = req.clone();
    return next.handle(req);
  }
}
