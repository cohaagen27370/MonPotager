import { Component, Inject, inject, Input, input, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { CategoryDto, FamilyDto } from '../../data/data-contracts';
import { MessageModule } from 'primeng/message';
import { LoadingImageComponent } from '../../components/loading-image/loading-image.component';
import { TypingModel } from '../../components/loading-image/typing.model';
import { FluidModule } from 'primeng/fluid';

@Component({
  selector: 'lcdj-family-form',
  imports: [
    InputTextModule,
    TextareaModule,
    IftaLabelModule,
    SelectModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    ReactiveFormsModule,
    MessageModule,
    LoadingImageComponent,
    FluidModule,
  ],
  templateUrl: './family-form.component.html',
  styleUrl: './family-form.component.scss',
})
export class FamilyFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  form!: FormGroup;
  onSubmit = output<FamilyDto>();

  isNew: boolean = false;
  isLoading = input<boolean>(false);

  private _family!: FamilyDto;

  get family(): FamilyDto {
    return this._family;
  }

  @Input('family')
  set family(value: FamilyDto | undefined) {
    this.form = this.formBuilder.group({
      description: new FormControl('', [Validators.required]),
      descriptionSource: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      imageSource: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      categoryId: new FormControl('1', [Validators.required]),
      germinationMinimalTemperature: new FormControl('', [
        Validators.min(5),
        Validators.max(40),
      ]),
      germinationOptimaleTemperature: new FormControl('', [
        Validators.min(5),
        Validators.max(40),
      ]),
      idealGrowingTemperature: new FormControl('', [
        Validators.min(15),
        Validators.max(35),
      ]),
      maximumRisingTime: new FormControl('', [
        Validators.min(1),
        Validators.max(360),
      ]),
      minimalRisingTime: new FormControl('', [
        Validators.min(1),
        Validators.max(360),
      ]),
      zeroVegetation: new FormControl('', [
        Validators.min(1),
        Validators.max(360),
      ]),
      sunshineDuration: new FormControl('', [
        Validators.min(4),
        Validators.max(24),
      ])
    });

    if (value) {
      this._family = value;
      this.isNew = false;

      this.form.controls['name'].setValue(value.name);
      this.form.controls['image'].setValue(value.image);
      this.form.controls['imageSource'].setValue(value.imageSource);
      this.form.controls['description'].setValue(value.description);
      this.form.controls['descriptionSource'].setValue(value.descriptionSource);
      this.form.controls['germinationMinimalTemperature'].setValue(
        value.germinationMinimalTemperature,
      );
      this.form.controls['categoryId'].setValue(value.categoryId);

      this.form.controls['germinationOptimaleTemperature'].setValue(
        value.germinationOptimaleTemperature,
      );
      this.form.controls['idealGrowingTemperature'].setValue(
        value.idealGrowingTemperature,
      );
      this.form.controls['maximumRisingTime'].setValue(value.maximumRisingTime);
      this.form.controls['minimalRisingTime'].setValue(value.minimalRisingTime);
      this.form.controls['zeroVegetation'].setValue(value.zeroVegetation);
      this.form.controls['sunshineDuration'].setValue(value.sunshineDuration);
    } else {
      this.isNew = true;
      this.form.controls['name'].setValue('');
      this.form.controls['image'].setValue('');
      this.form.controls['imageSource'].setValue('');
      this.form.controls['description'].setValue('');
      this.form.controls['descriptionSource'].setValue('');
      this.form.controls['germinationMinimalTemperature'].setValue(undefined);
      this.form.controls['germinationOptimaleTemperature'].setValue(undefined);
      this.form.controls['idealGrowingTemperature'].setValue(undefined);
      this.form.controls['maximumRisingTime'].setValue(undefined);
      this.form.controls['minimalRisingTime'].setValue(undefined);
      this.form.controls['zeroVegetation'].setValue(undefined);
      this.form.controls['sunshineDuration'].setValue(undefined);
    }
  }

  categories = input.required<Array<CategoryDto>>();
  model!: FamilyDto;

  constructor(@Inject('BASE_API_URL') public uploadUrl: string) {}

  referencerImage(reference: TypingModel) {
    this.form.controls['image'].setValue(reference.value);
  }

  submit() {
    const newFamily = this.form.value as FamilyDto;

    if (!this.isNew) {
      newFamily.id = this.family.id as string;
    }

    this.onSubmit.emit(newFamily);
  }
}
