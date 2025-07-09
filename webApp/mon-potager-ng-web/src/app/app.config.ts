import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideRouter,
  withRouterConfig,
} from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { WA_POSITION_OPTIONS } from '@ng-web-apis/geolocation';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/authconfig.interceptor';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      //withHashLocation(),
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'light',
          cssLayer: false,
        },
      },
      ripple: true,
      translation: {
        accept: 'Accepter',
        reject: 'Annuler',

        monthNames: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre',
        ],
        monthNamesShort: [
          'Jan',
          'Fév',
          'Mars',
          'Avr',
          'Mai',
          'Juin',
          'Jui',
          'Août',
          'Sept',
          'Oct',
          'Nov',
          'Déc',
        ],
        dayNamesMin: ['Dim', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
        dayNames: [
          'Dimanche',
          'Lundi',
          'Mardi',
          'Mercredi',
          'Jeudi',
          'Vendredi',
          'Samedi',
        ],
        clear: 'Effacer',
        today: "Aujourd'hui",
      },
    }),
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    },
    {
      provide: 'BASE_API_URL',
      useValue: environment.apiUrl,
    },
    {
      provide: 'IMG_API_URL',
      useValue: environment.imageUrl,
    },
    {
      provide: WA_POSITION_OPTIONS,
      useValue: {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 350000,
      },
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideClientHydration(),
  ],
};
