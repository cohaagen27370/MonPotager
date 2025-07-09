import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { UserDto } from '../../data/data-contracts';

import { inject } from '@angular/core';
import { RepositoryService, UserService } from '../../services';
import { leafletModel } from '../../components/leaflet-map/leaflet.model';

export interface SignupState {
  captchaId: string;
  captchaImage: string | null | undefined;
  latitude: number;
  longitude: number;
  selectedStation?: leafletModel;
}

export const SignupStateInitial: SignupState = {
  captchaId: '',
  captchaImage: '',
  latitude: 0,
  longitude: 0,
  selectedStation: undefined,
};

export const signupStore = signalStore(
  withState(SignupStateInitial),
  withMethods(
    (
      store,
      userService = inject(UserService),
      repositoryService = inject(RepositoryService),
    ) => ({
      async getCaptcha() {
        const datas = await userService.getCaptcha();

        patchState(store, {
          captchaId: datas.id,
          captchaImage: datas.image,
        });
      },
      addNew(user: UserDto) {
        userService.addNew(user);
      },

      checkEmail(value: string) {
        return userService.emailAlreadyExists(value);
      },

      checkCaptcha(value: string) {
        return userService.captchaIsNOk(value, store.captchaId());
      },

      async getNearestStation(latitude: number, longitude: number) {
        patchState(store, { latitude, longitude });

        return await repositoryService.getNearestStation(latitude, longitude);
      },
    }),
  ),
);
