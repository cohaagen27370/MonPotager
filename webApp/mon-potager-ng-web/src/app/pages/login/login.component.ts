import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoginFormComponent } from '../../forms/login-form/login-form.component';

import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'lcdj-login',
  imports: [ButtonModule, InputTextModule, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {
    class: 'w-full',
  },
})
export class LoginComponent {
  _location = inject(Location);
  router = inject(Router);

  goBack() {
    this._location.back();
  }
}
