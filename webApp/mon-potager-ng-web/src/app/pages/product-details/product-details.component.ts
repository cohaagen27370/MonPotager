import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { Subscription, take } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { Location } from '@angular/common';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { LoadingPanelComponent } from '../../components/loading-panel/loading-panel.component';
import { productDetailsStore } from './product-details.store';

@Component({
  selector: 'app-product-details',
  imports: [ImageModule, RouterModule, ButtonModule,CheckboxModule,CardModule, FormsModule, IftaLabelModule, InputTextModule, LoadingPanelComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  host: {
    class: 'w-full',
  },
  providers: [productDetailsStore],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  meta = inject(Meta);

  store = inject(productDetailsStore);

  ngOnInit(): void {
    this.meta.addTags([
      {
        name: 'description',
        content: "Détails d'une culture ou d'une préparation.",
      },
      {
        name: 'keywords',
        content: 'détails, culture, plante, fruit, préparation, informations',
      },
      {
        property: 'og:title',
        content:
          "Consultation des détails d'une plante potagère, d'un fruit ou d'une préparation",
      },
      {
        property: 'og:description',
        content: 'Informations sur une plante ou un fruit',
      },
      {
        property: 'og:image',
        content:
          'https://monpotager.alwaysdata.net/assets/LogoMonPotagerTransp.png',
      },
      {
        property: 'og:url',
        content: 'https://monpotager.alwaysdata.net/#/product-details/',
      },
    ]);

    this.subscriptionRoute = this.route.params
      .pipe(take(1))
      .subscribe((params) => {
        this.store.setProductId(params['productId']);
      });
  }

  ngOnDestroy(): void {
    if (this.subscriptionRoute) this.subscriptionRoute.unsubscribe();
  }

  router = inject(Router);
  route = inject(ActivatedRoute);

  _location = inject(Location);

  constructor(@Inject('IMG_API_URL') public imageUrl: string) {}

  getProductImage() {
    if (this.store.hasData())
      return `${this.imageUrl}${this.store.variant!()!.image}.jpg`;

    return '';
  }
  getProductFullImage() {
    if (this.store.hasData())
    return `${this.imageUrl}${this.store.variant!()!.image}_full.jpg`;

    return '';
  }

  goBack() {
    this._location.back();
  }

  private subscriptionRoute!: Subscription;
}
