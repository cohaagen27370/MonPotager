import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { StepperModule } from 'primeng/stepper';
import { LeafletMapComponent } from '../../components/leaflet-map/leaflet-map.component';
import { leafletModel } from '../../components/leaflet-map/leaflet.model';
import { PasswordModule } from 'primeng/password';
import { Router, RouterModule } from '@angular/router';
import { FluidModule } from 'primeng/fluid';
import { signupStore } from './signup.store';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { stat } from 'fs';

@Component({
  selector: 'lcdj-signup-form',
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
    IftaLabelModule,
    StepperModule,
    LeafletMapComponent,
    PasswordModule,
    RouterModule,
    FluidModule,
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
  host: {
    class: 'w-full',
  },
  providers: [signupStore],
})
export class SignupFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly geolocationService = inject(GeolocationService);

  store = inject(signupStore);

  formSignUp: FormGroup;
  isLoading: boolean = false;
  showSignUpError: boolean = false;
  showConnectionError: boolean = false;

  selectedStation: leafletModel | undefined = undefined;

  formName: FormControl = new FormControl<string>('', [Validators.required]);
  formEmail: FormControl = new FormControl<string>('', {
    validators: [Validators.email, Validators.required],
    asyncValidators: [this.emailAlreadyExistsValidator()],
  });
  formPassword: FormControl = new FormControl<string>('', [
    Validators.maxLength(15),
    Validators.minLength(3),
    Validators.required,
  ]);
  formConfirmPassword: FormControl = new FormControl<string>('', [
    Validators.maxLength(15),
    Validators.minLength(3),
    Validators.required,
  ]);
  formCaptcha: FormControl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ],
    asyncValidators: [this.captchaOkValidator()],
  });
  /**
   *
   */
  constructor() {
    this.formSignUp = this.formBuilder.group({
      formEmail: this.formEmail,
      formName: this.formName,
      formPassword: this.formPassword,
      formConfirmPassword: this.formConfirmPassword,
      formCaptcha: this.formCaptcha,
    });

    this.formSignUp.addValidators(
      this.createCompareValidator(
        this.formSignUp.controls['formPassword'],
        this.formSignUp.controls['formConfirmPassword'],
      ),
    );
  }

  emailAlreadyExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      const email = control.value;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!email) {
        return Promise.resolve(null); // Pas de validation si le champ est vide
      }
      if (!emailRegex.test(email)) {
        return Promise.resolve(null); // Pas de validation si le champ n'est pas au format email
      }

      return this.store
        .checkEmail(email)
        .then((isExists: boolean) =>
          isExists ? { isEmailAlreadyExist: true } : null,
        )
        .catch(() => {
          return null; // En cas d'erreur, considérer la validation comme réussie (à adapter)
        });
    };
  }

  captchaOkValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      const value = control.value;

      if (!value) {
        return Promise.resolve(null); // Pas de validation si le champ est vide
      }

      if (value.length < 6) {
        return Promise.resolve(null); // Pas de validation si la taille du champs est inférieure à 6
      }

      return this.store
        .checkCaptcha(value)
        .then((isNOk: boolean) => (isNOk ? { isCaptchaNOk: true } : null))
        .catch(() => {
          return null; // En cas d'erreur, considérer la validation comme réussie (à adapter)
        });
    };
  }

  createCompareValidator(
    controlOne: AbstractControl,
    controlTwo: AbstractControl,
  ) {
    return () => {
      if (controlOne.value !== controlTwo.value) {
        controlTwo.setErrors({ mustMatch: true });
      } else {
        controlTwo.setErrors(null);
      }

      return null;
    };
  }

  generateCaptchaAgain() {
    this.store.getCaptcha();
  }

  ngOnInit() {
    this.store.getCaptcha();
  }

  selectStation(station: leafletModel) {
    this.selectedStation = station;
  }

  async findNearest() {
    this.geolocationService.subscribe(async (position) => {
      const station = await this.store.getNearestStation(
        position.coords.latitude,
        position.coords.longitude,
      );
      this.selectStation({
        selectedStationId: station.id,
        selectedStationName: `${station.name} (${station.codeDepartement})`,
      });
    });
  }

  signup() {
    this.isLoading = true;

    try {
      this.store.addNew({
        name: this.formName.value,
        email: this.formEmail.value,
        password: this.formPassword.value,
        captchaValue: this.formCaptcha.value,
        captchaId: this.store.captchaId(),
        stationId: this.selectedStation?.selectedStationId,
      });

      this.router.navigate(['app', 'catalog']);
    } catch (err: any) {
      if (err.status == 0) {
        this.showConnectionError = true;
      } else {
        this.showSignUpError = err.status == 401 || err.status == 404;
      }
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }
}
