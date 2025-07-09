import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { MessageDto, ProductWithDescriptionDto } from '../../data/data-contracts';

import { inject } from '@angular/core';
import { ProductService } from '../../services';


export interface ProductDetailState {
  variant?: ProductWithDescriptionDto;
  hasData:boolean;
  productId: string;
  isLoading: boolean;
}

export const ProductDetailStateInitial: ProductDetailState = {
  variant: undefined,
  hasData : false,
  productId: '',
  isLoading : false
};

export const productDetailsStore = signalStore(
  withState(ProductDetailStateInitial),
  withMethods((store, productService = inject(ProductService)) => ({

    setProductId(productId: string) {
      patchState(store, {
        productId,
      });

      this.getDetails();
    },

    async getDetails() {
      try {
        patchState(store, { isLoading: true });

        const details = await productService.getProductDetails(
          store.productId()
        );

        if (details) {
          patchState(store, {
            hasData : true,
            variant: details,
            isLoading : false
          });
        } else {
          patchState(store, {
            hasData : false,
            isLoading: false
          });
        }
      } catch (err: any) {
        if (err.status == 404) {
          patchState(store, {
            hasData : false,
            isLoading : false
          });
        }
      }
    },
  })),
);
