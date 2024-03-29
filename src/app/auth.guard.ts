import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const item = localStorage.getItem('user');
  if (item) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
