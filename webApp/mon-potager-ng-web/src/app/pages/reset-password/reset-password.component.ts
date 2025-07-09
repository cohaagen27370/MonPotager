import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { InputOtpModule } from 'primeng/inputotp';
import { UserService } from '../../services';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'lcdj-reset-password',
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
    IftaLabelModule,
    PasswordModule,
    InputOtpModule,
    RouterModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  host: {
    class: 'w-full',
  }
})
export class ResetPasswordComponent {

  private formBuilder = inject(FormBuilder);

  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  formReset: FormGroup;
  isLoading: boolean = false;
  showLoginError: boolean = false;
  showConnectionError: boolean = false;

  codeSent:boolean = false;

  formEmail: FormControl = new FormControl<string>('', [
    Validators.email,
    Validators.required,
  ]);
  formNewPassword: FormControl = new FormControl<string>('', [
    Validators.maxLength(15),
    Validators.minLength(3),
    Validators.required,
  ]);
  formConfirmationNewPassword: FormControl = new FormControl<string>('', [
    Validators.maxLength(15),
    Validators.minLength(3),
    Validators.required,
  ]);
  formOtp: FormControl = new FormControl<string>('', [
    Validators.required
  ]);

  constructor() {
    this.formReset = this.formBuilder.group({
      formEmail: this.formEmail,
      formNewPassword: this.formNewPassword,
      formConfirmationNewPassword : this.formConfirmationNewPassword,
      formOtp : this.formOtp
    });

    this.formReset.addValidators(this.createCompareValidator(this.formReset.controls['formNewPassword'],this.formReset.controls['formConfirmationNewPassword']));
  }

  async submit() {
    await this.userService.resetPassword({
      email : this.formEmail.value,
      newPassword : this.formNewPassword.value,
      resetWord : this.formOtp.value
    });
    this.router.navigate(['home','login']);
  }

  async sendOtp() {
    this.codeSent = true;
    await this.userService.askForResetPassword(this.formEmail.value);
  }

  createCompareValidator(controlOne: AbstractControl, controlTwo: AbstractControl) {
      return () => {

      if (controlOne.value !== controlTwo.value) {
        controlTwo.setErrors({ mustMatch: true });
      } else {
        controlTwo.setErrors(null);
      }

      return null;
    }
  }

}
