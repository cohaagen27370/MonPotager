import {
  Component,
  HostBinding,
  HostListener,
  inject,
  Inject,
  input,
  output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductWithVarietyDto } from '../../data/data-contracts';
import { CategoryColorDirective } from '../../directives/category-color/category-color.directive';
import { globalStore } from '../../core/global.store';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'product-search',
  imports: [ButtonModule, CategoryColorDirective, ImageComponent],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss',
})
export class ProductSearchComponent {
  product = input.required<ProductWithVarietyDto>();

  onClick = output<string>();
  onDetail = output<string>();
  onCalendar = output<string>();
  onAdd = output<ProductWithVarietyDto>();

  globalStore = inject(globalStore);

  @HostBinding('attr.class') get classes(): string {
    if (!this.product().hasOwnProperty('variety'))
      return ['over'].filter(Boolean).join(' ').trim();

    return '';
  }

  @HostListener('click') itemClick() {
    if (!this.product().hasOwnProperty('variety'))
      this.onClick.emit(this.product().name as string);
  }

  viewDetails() {
    this.onDetail.emit(this.product().id as string);
  }

  viewCalendar() {
    this.onCalendar.emit(this.product().id as string);
  }

  addToStock() {
    this.onAdd.emit(this.product());
  }
}
