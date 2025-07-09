import { DatePipe, NgClass, NgStyle } from '@angular/common';
import {
  Component,
  inject,
  Inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBatteryEmpty,
  faBatteryFull,
  faBatteryHalf,
  faBatteryQuarter,
  faBatteryThreeQuarters,
} from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { Avatar } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { PackageDto } from '../../data/data-contracts';
import { stocksStore } from '../../pages/stocks/stocks.store';
import { FractionPipe } from '../../pipes/fraction.pipe';

@Component({
  selector: 'lcdj-unitary-package',
  imports: [
    SliderModule,
    FormsModule,
    ButtonModule,
    FractionPipe,
    DatePipe,
    SelectButtonModule,
    FontAwesomeModule,
    RadioButtonModule,
    Avatar,
    NgClass,
    NgStyle,
  ],
  templateUrl: './unitary-package.component.html',
  styleUrl: './unitary-package.component.scss',
})
export class UnitaryPackageComponent implements OnInit {
  package = input.required<PackageDto>();

  category = input.required<number | undefined>();
  variant = input.required<string | undefined>();

  onChange = output();

  store = inject(stocksStore);
  stageId: number = 1;

  quantity: number = 0;

  faBatteryEmpty = faBatteryEmpty;
  faBatteryHalf = faBatteryHalf;
  faBatteryFull = faBatteryFull;
  faBatteryQuarter = faBatteryQuarter;
  faBatteryThreeQuarters = faBatteryThreeQuarters;

  quantityList = [
    { icon: faBatteryEmpty, quantity: 0 },
    { icon: faBatteryQuarter, quantity: 0.25 },
    { icon: faBatteryHalf, quantity: 0.5 },
    { icon: faBatteryThreeQuarters, quantity: 0.75 },
    { icon: faBatteryFull, quantity: 1 },
  ];

  constructor(@Inject('IMG_API_URL') public imgBaseUrl: string) { }

  ngOnInit(): void {
    this.quantity = this.package().remainingQuantity;
    this.store.GetStartStages(this.category() as number);
  }

  saveOnlyQuality() {
    this.store.UpdatePackage(this.package().id!, this.quantity);
    this.onChange.emit();
  }

  savePackage() {
    this.store.UpdatePackage(this.package().id!, this.quantity);
    this.store.AddNewFlow({
      startDate: format(new Date(), 'yyyy-MM-dd'),
      startStageId: this.stageId,
      variantId: this.variant(),
    });
    this.onChange.emit();
  }
}
