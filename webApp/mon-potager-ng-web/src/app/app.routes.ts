import { Routes } from '@angular/router';
import { CoverComponent } from './cover.component';
import { ApplicationComponent } from './application.component';
import { authGuard } from './core/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/welcome',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: CoverComponent,
    children :[
      {
        path: 'welcome',
        title: 'Le Compagnon du jardinier',
        loadComponent: () =>
          import('./pages/home/home.component').then(
            (m) => m.HomeComponent,
          ),
      },
      {
        path: 'confidentiality',
        title: 'Le Compagnon du jardinier - Confidentialité',
        loadComponent: () =>
          import('./pages/confidentiality/confidentiality.component').then(
            (m) => m.ConfidentialityComponent,
          ),
      },
      {
        path: 'conditionOfUse',
        title: 'Le Compagnon du jardinier - Conditions d\'utilisation',
        loadComponent: () =>
          import('./pages/condition-of-use/condition-of-use.component').then(
            (m) => m.ConditionOfUseComponent,
          ),
      },
      {
        path: 'login',
        title: 'Le Compagnon du jardinier - Connexion',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'signup',
        title: 'Le Compagnon du jardinier - Inscription',
        loadComponent: () =>
          import('./pages/signup/signup.component').then((m) => m.SignupComponent),
      },
      {
        path: 'reset-password',
        title: 'Le Compagnon du jardinier - Réinitialisation du mot de passe',
        loadComponent: () =>
          import('./pages/reset-password/reset-password.component').then(
            (m) => m.ResetPasswordComponent,
          ),
      }
    ]
  },
  {
    path: 'app',
    component: ApplicationComponent,
    children :[
      {
        path: '',
        redirectTo: 'messages',
        pathMatch: 'full',
      },
      {
        path: 'messages',
        title: 'Le Compagnon du jardinier - Messagerie',
        canActivate : [authGuard],
        loadComponent: () =>
          import('./pages/messaging/messaging.component').then(
            (m) => m.MessagingComponent,
          ),
      },
      {
        path: 'admin',
        title: 'Le Compagnon du jardinier - Administration',
        canActivate : [authGuard],
        loadComponent: () =>
          import('./pages/admin/admin.component').then((m) => m.AdminComponent),
      },
      {
        path: 'inprogress',
        title: 'Le Compagnon du jardinier - Cultures',
        canActivate : [authGuard],
        loadComponent: () =>
          import('./pages/in-progress/in-progress.component').then(
            (m) => m.InProgressComponent,
          ),
      },
      {
        path: 'stocks',
        title: 'Le Compagnon du jardinier - Stocks',
        canActivate : [authGuard],
        loadComponent: () =>
          import('./pages/stocks/stocks.component').then((m) => m.StocksComponent),
      },
      {
        path: 'catalog',
        title: 'Le Compagnon du jardinier - Catalogue',
        canActivate : [authGuard],
        loadComponent: () =>
          import('./pages/catalog/catalog.component').then(
            (m) => m.CatalogComponent,
          ),
      },
      {
        path: 'product-details/:productId',
        title: 'Le Compagnon du jardinier - Détails du produit',
        canActivate : [authGuard],
        loadComponent: () =>
          import('./pages/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent,
          ),
      }
    ]
  },
];
