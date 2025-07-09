import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from '@ngrx/signals';
import { addSeconds, compareAsc } from 'date-fns';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
import { TypesUser } from '../data/data-contracts';

export interface GlobalState {
  token: string;
  expirationDate: Date;
  name: string;
  email: string;
  type: TypesUser;
  selectedMenu: string;
}

export const GlobalStateInitial: GlobalState = {
  token: '',
  expirationDate: new Date(),
  name: '',
  email: '',
  type: TypesUser.NONE,
  selectedMenu: 'inprogress',
};

export const globalStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(GlobalStateInitial),
  withMethods(
    (
      store,
      userService = inject(UserService),
      storageService = inject(StorageService),
    ) => ({
      selectMenu(menu: string) {
        patchState(store, { selectedMenu: menu });
      },
      getToken() {
        const token = localStorage.getItem('id_token');

        if (token) {
          const expiracy = localStorage.getItem('expires_at');
          if (expiracy)
            patchState(store, {
              token,
              expirationDate: addSeconds(new Date(), parseInt(expiracy)),
            });

          this.getMe();
        }
      },

      setToken(token: string, expiracy: number) {
        const expiresAt = addSeconds(new Date(), expiracy);
        localStorage.setItem('id_token', token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt));

        storageService.setItem('id_token', token);

        patchState(store, {
          token,
          expirationDate: addSeconds(new Date(), expiracy),
        });

        if (token) this.getMe();
      },

      async getMe() {
        const me = await userService.getMe();
        patchState(store, {
          name: me.name as string,
          email: me.email as string,
          type: me.typeUser,
        });
      },
    }),
  ),
  withComputed((store) => ({
    isAuthenticated: computed(
      () =>
        store.token() != '' &&
        compareAsc(new Date(), store.expirationDate()) != 1,
    ),
  })),
  withComputed((store) => ({
    isAdmin: computed(
      () => store.isAuthenticated() && store.type() === TypesUser.ADMINISTRATOR,
    ),
  })),
);
