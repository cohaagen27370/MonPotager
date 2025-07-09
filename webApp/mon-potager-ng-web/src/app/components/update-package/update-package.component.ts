import { Component, inject, Inject, Input, input, output } from '@angular/core';
import { stocksStore } from '../../pages/stocks/stocks.store';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UnitaryPackageComponent } from '../unitary-package/unitary-package.component';
import { CategoryColorDirective } from '../../directives/category-color/category-color.directive';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'lcdj-update-package',
  imports: [
    SliderModule,
    FormsModule,
    ButtonModule,
    UnitaryPackageComponent,
    CategoryColorDirective,
    ImageComponent,
  ],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.scss',
})
export class UpdatePackageComponent {
  _stockId: string = '';

  onChange = output();

  store = inject(stocksStore);

  @Input()
  set stockId(stockId: string) {
    this._stockId = stockId;
    this.store.GetStockDetail(stockId);
  }

  get stockId(): string {
    return this._stockId;
  }

  changeQuantity() {
    this.onChange.emit();
  }
}
