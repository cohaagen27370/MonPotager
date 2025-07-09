import { Component, Inject, inject, Input, input, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FamilyDto, VariantDto } from '../../data/data-contracts';
import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { LoadingImageComponent } from '../../components/loading-image/loading-image.component';
import { TypingModel } from '../../components/loading-image/typing.model';
import { FluidModule } from 'primeng/fluid';

@Component({
  selector: 'lcdj-variant-form',
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
    CheckboxModule,
    CardModule,
    LoadingImageComponent,
    FluidModule,
  ],
  templateUrl: './variant-form.component.html',
  styleUrl: './variant-form.component.scss',
})
export class VariantFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  form!: FormGroup;
  onSubmit = output<VariantDto>();

  isNew: boolean = false;
  isLoading = input<boolean>(false);

  private _variant!: VariantDto;

  get variant(): VariantDto {
    return this._variant;
  }

  @Input('variant')
  set variant(value: VariantDto | undefined) {
    this.form = this.formBuilder.group({
      familyId: new FormControl<number>(1, { nonNullable: true }),
      name: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      imageSource : new FormControl('', [Validators.required]),
      minMaturationDaysCount: new FormControl('', [
        Validators.required,
        Validators.min(7),
        Validators.max(300),
      ]),
      maxMaturationDaysCount: new FormControl('', [
        Validators.required,
        Validators.min(7),
        Validators.max(300),
      ]),
      sowingMonthJanuary: new FormControl(false),
      sowingMonthFebruary: new FormControl(false),
      sowingMonthMarch: new FormControl(false),
      sowingMonthApril: new FormControl(false),
      sowingMonthMay: new FormControl(false),
      sowingMonthJune: new FormControl(false),
      sowingMonthJuly: new FormControl(false),
      sowingMonthAugust: new FormControl(false),
      sowingMonthSeptember: new FormControl(false),
      sowingMonthOctober: new FormControl(false),
      sowingMonthNovember: new FormControl(false),
      sowingMonthDecember: new FormControl(false),

      harvestMonthJanuary: new FormControl(false),
      harvestMonthFebruary: new FormControl(false),
      harvestMonthMarch: new FormControl(false),
      harvestMonthApril: new FormControl(false),
      harvestMonthMay: new FormControl(false),
      harvestMonthJune: new FormControl(false),
      harvestMonthJuly: new FormControl(false),
      harvestMonthAugust: new FormControl(false),
      harvestMonthSeptember: new FormControl(false),
      harvestMonthOctober: new FormControl(false),
      harvestMonthNovember: new FormControl(false),
      harvestMonthDecember: new FormControl(false),
    });


    if (value) {
      this._variant = value;
      this.isNew = false;
      this.form.controls['name'].setValue(value.name);
      this.form.controls['familyId'].setValue(value.familyId);
      this.form.controls['image'].setValue(value.image);
      this.form.controls['imageSource'].setValue(value.imageSource);
      this.form.controls['minMaturationDaysCount'].setValue(
        value.minMaturationDaysCount,
      );
      this.form.controls['maxMaturationDaysCount'].setValue(
        value.maxMaturationDaysCount,
      );
      this.form.controls['sowingMonthJanuary'].setValue(
        value.sowingMonths?.january,
      );
      this.form.controls['sowingMonthFebruary'].setValue(
        value.sowingMonths?.february,
      );
      this.form.controls['sowingMonthMarch'].setValue(
        value.sowingMonths?.march,
      );
      this.form.controls['sowingMonthApril'].setValue(
        value.sowingMonths?.april,
      );
      this.form.controls['sowingMonthMay'].setValue(value.sowingMonths?.may);
      this.form.controls['sowingMonthJune'].setValue(value.sowingMonths?.june);
      this.form.controls['sowingMonthJuly'].setValue(value.sowingMonths?.july);
      this.form.controls['sowingMonthAugust'].setValue(
        value.sowingMonths?.august,
      );
      this.form.controls['sowingMonthSeptember'].setValue(
        value.sowingMonths?.september,
      );
      this.form.controls['sowingMonthOctober'].setValue(
        value.sowingMonths?.october,
      );
      this.form.controls['sowingMonthNovember'].setValue(
        value.sowingMonths?.november,
      );
      this.form.controls['sowingMonthDecember'].setValue(
        value.sowingMonths?.december,
      );

      this.form.controls['harvestMonthJanuary'].setValue(
        value.harvestMonths?.january,
      );
      this.form.controls['harvestMonthFebruary'].setValue(
        value.harvestMonths?.february,
      );
      this.form.controls['harvestMonthMarch'].setValue(
        value.harvestMonths?.march,
      );
      this.form.controls['harvestMonthApril'].setValue(
        value.harvestMonths?.april,
      );
      this.form.controls['harvestMonthMay'].setValue(value.harvestMonths?.may);
      this.form.controls['harvestMonthJune'].setValue(
        value.harvestMonths?.june,
      );
      this.form.controls['harvestMonthJuly'].setValue(
        value.harvestMonths?.july,
      );
      this.form.controls['harvestMonthAugust'].setValue(
        value.harvestMonths?.august,
      );
      this.form.controls['harvestMonthSeptember'].setValue(
        value.harvestMonths?.september,
      );
      this.form.controls['harvestMonthOctober'].setValue(
        value.harvestMonths?.october,
      );
      this.form.controls['harvestMonthNovember'].setValue(
        value.harvestMonths?.november,
      );
      this.form.controls['harvestMonthDecember'].setValue(
        value.harvestMonths?.december,
      );
    } else {
      this.isNew = true;
      this.form.controls['name'].reset();
      this.form.controls['familyId'].setValue(false);
      this.form.controls['image'].setValue('');
      this.form.controls['imageSource'].setValue('');
      this.form.controls['minMaturationDaysCount'].setValue(0);
      this.form.controls['maxMaturationDaysCount'].setValue(0);
      this.form.controls['sowingMonthJanuary'].setValue(false);
      this.form.controls['sowingMonthFebruary'].setValue(false);
      this.form.controls['sowingMonthMarch'].setValue(false);
      this.form.controls['sowingMonthApril'].setValue(false);
      this.form.controls['sowingMonthMay'].setValue(false);
      this.form.controls['sowingMonthJune'].setValue(false);
      this.form.controls['sowingMonthJuly'].setValue(false);
      this.form.controls['sowingMonthAugust'].setValue(false);
      this.form.controls['sowingMonthSeptember'].setValue(false);
      this.form.controls['sowingMonthOctober'].setValue(false);
      this.form.controls['sowingMonthNovember'].setValue(false);
      this.form.controls['sowingMonthDecember'].setValue(false);

      this.form.controls['harvestMonthJanuary'].setValue(false);
      this.form.controls['harvestMonthFebruary'].setValue(false);
      this.form.controls['harvestMonthMarch'].setValue(false);
      this.form.controls['harvestMonthApril'].setValue(false);
      this.form.controls['harvestMonthMay'].setValue(false);
      this.form.controls['harvestMonthJune'].setValue(false);
      this.form.controls['harvestMonthJuly'].setValue(false);
      this.form.controls['harvestMonthAugust'].setValue(false);
      this.form.controls['harvestMonthSeptember'].setValue(false);
      this.form.controls['harvestMonthOctober'].setValue(false);
      this.form.controls['harvestMonthNovember'].setValue(false);
      this.form.controls['harvestMonthDecember'].setValue(false);
    }
  }

  families = input.required<Array<FamilyDto>>();
  model!: VariantDto;

  constructor(@Inject('BASE_API_URL') public uploadUrl: string) {}

  referencerImage(reference: TypingModel) {
    this.form.controls['image'].setValue(reference.value);
  }

  submit() {
    let newVariant = this.form.value as VariantDto;

    if (!this.isNew) {
      newVariant.id = this.variant.id as string;
    }
    newVariant = {
      sowingMonths: {
        january: this.form.controls['sowingMonthJanuary'].value,
        february: this.form.controls['sowingMonthFebruary'].value,
        march: this.form.controls['sowingMonthMarch'].value,
        april: this.form.controls['sowingMonthApril'].value,
        may: this.form.controls['sowingMonthMay'].value,
        june: this.form.controls['sowingMonthJune'].value,
        july: this.form.controls['sowingMonthJuly'].value,
        august: this.form.controls['sowingMonthAugust'].value,
        september: this.form.controls['sowingMonthSeptember'].value,
        october: this.form.controls['sowingMonthOctober'].value,
        november: this.form.controls['sowingMonthNovember'].value,
        december: this.form.controls['sowingMonthDecember'].value,
      },
      harvestMonths: {
        january: this.form.controls['harvestMonthJanuary'].value,
        february: this.form.controls['harvestMonthFebruary'].value,
        march: this.form.controls['harvestMonthMarch'].value,
        april: this.form.controls['harvestMonthApril'].value,
        may: this.form.controls['harvestMonthMay'].value,
        june: this.form.controls['harvestMonthJune'].value,
        july: this.form.controls['harvestMonthJuly'].value,
        august: this.form.controls['harvestMonthAugust'].value,
        september: this.form.controls['harvestMonthSeptember'].value,
        october: this.form.controls['harvestMonthOctober'].value,
        november: this.form.controls['harvestMonthNovember'].value,
        december: this.form.controls['harvestMonthDecember'].value,
      },
      ...newVariant,
    };

    this.onSubmit.emit(newVariant);
  }
}
