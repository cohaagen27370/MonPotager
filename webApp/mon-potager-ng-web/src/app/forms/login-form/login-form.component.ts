import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { LoginService } from '../../services';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FluidModule } from 'primeng/fluid';

@Component({
  selector: 'lcdj-login-form',
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
    IftaLabelModule,
    RouterModule,
    FluidModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  host: {
    class: 'w-screen md:w-8 lg:w-8 xl:w-8',
  },
  providers: [MessageService],
})
export class LoginFormComponent {
  messageService = inject(MessageService);

  formBuilder = inject(FormBuilder);
  loginService = inject(LoginService);
  router = inject(Router);

  formLogin: FormGroup;
  isLoading: boolean = false;
  showLoginError: boolean = false;
  showConnectionError: boolean = false;

  formEmail: FormControl = new FormControl<string>('', [
    Validators.email,
    Validators.required,
  ]);
  formPassword: FormControl = new FormControl<string>('', [
    Validators.maxLength(15),
    Validators.minLength(3),
    Validators.required,
  ]);

  /**
   *
   */
  constructor() {
    this.formLogin = this.formBuilder.group({
      formEmail: this.formEmail,
      formPassword: this.formPassword,
    });
  }

  resetPassword() {
    this.router.navigate(['home','reset-password']);
  }

  async login() {
    this.isLoading = true;

    try {
      await this.loginService.login({
        email: this.formEmail.value,
        password: this.formPassword.value,
      });

      this.messageService.add({
        severity: 'info',
        summary: 'Bienvenue',
      });

      this.router.navigate(['app','messages']);
    } catch (err: any) {
      if (err.status == 0) {
        this.showConnectionError = true;
      } else {
        this.showLoginError = err.status == 401 || err.status == 404;
      }
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }
}
