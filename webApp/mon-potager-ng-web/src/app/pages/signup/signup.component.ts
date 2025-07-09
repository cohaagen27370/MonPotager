import { Component, inject } from '@angular/core';
import { SignupFormComponent } from '../../forms/signup-form/signup-form.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'lcdj-signup',
  imports: [ButtonModule, InputTextModule, SignupFormComponent, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  host: {
    class: 'w-full mx-5',
  },
})
export class SignupComponent {

  _location = inject(Location);
  router = inject(Router);

  goBack() {
    this._location.back();
  }

}
