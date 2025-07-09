import { Component, inject, Inject, input, output } from '@angular/core';

import { DatePipe } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { StocksStateDto } from '../../data/data-contracts';
import { ImageComponent } from '../image/image.component';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  imports: [AvatarModule, PanelModule, ToolbarModule, DatePipe, ImageComponent, ButtonModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
})
export class StockComponent {
  model = input.required<StocksStateDto>();
  router = inject(Router);

  onClick = output();

  constructor(@Inject('IMG_API_URL') public imgBaseUrl: string) {}

  viewDetails() {
    this.onClick.emit();
  }

  viewDetailsProduct(productId: string) {
    this.router.navigate(['app','product-details', productId]);
  }

}
