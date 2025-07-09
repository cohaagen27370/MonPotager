import { Component, Inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { format } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { PackageDto, ProductWithVarietyDto } from '../../data/data-contracts';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'lcdj-add-package',
  imports: [ButtonModule, DatePickerModule, FormsModule, ImageComponent],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.scss',
})
export class AddPackageComponent {
  product = input.required<ProductWithVarietyDto>();

  onAdd = output<PackageDto>();

  buyingDate: Date = new Date();
  expirationDate: Date = new Date();
  now: Date = new Date();

  AddPackage() {
    this.onAdd.emit({
      expirationDate: format(this.expirationDate, 'yyyy-MM-dd'),
      purchaseDate: format(this.buyingDate, 'yyyy-MM-dd'),
      remainingQuantity: 1,
    });
  }
}
