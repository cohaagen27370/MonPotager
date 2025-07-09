import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { globalStore } from './global.store';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(globalStore);

  store.getToken();

  if (store.isAuthenticated()) {
    return true;
  } else {
    return router.parseUrl('home/login');
  }
};
