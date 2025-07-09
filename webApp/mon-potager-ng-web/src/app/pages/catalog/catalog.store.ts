import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  ArrayProductWithVarietyDto,
  PackageDto,
  ProductWithDescriptionDto,
  ProductWithNameDto} from '../../data/data-contracts';
import { PackageService, ProductService, StockService } from '../../services';

import { inject } from '@angular/core';

export interface CatalogState {
  products: ArrayProductWithVarietyDto | undefined
  productsMostSearched: Array<ProductWithNameDto>;
  details: ProductWithDescriptionDto | undefined;
  hasSearchedData: boolean;
  hasData: boolean;
  hasDetails: boolean;
  isLoading: boolean;
  term: string;
  selectedProductId : string;
  paginationProducts: {
    pageNumber: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
  };
}

export const CatalogStateInitial: CatalogState = {
  products: undefined,
  productsMostSearched: [],
  details: undefined,
  hasSearchedData: false,
  hasData: false,
  hasDetails: false,
  isLoading: false,
  term : '',
  selectedProductId : '',
  paginationProducts: {
    pageNumber: 0,
    pageSize: 6,
    pageCount: 1,
    totalCount: 0,
  },
};

export const catalogStore = signalStore(
  withState(CatalogStateInitial),
  withMethods(
    (
      store,
      productService = inject(ProductService),
      stockService = inject(StockService),
      packageService = inject(PackageService),
    ) => ({

      selectProduct(productId: string) {
        patchState(store, {
          selectedProductId: productId,
        });
      },

      async getMostSearchProducts() {
        try {
          patchState(store, {
            isLoading: true,
          });

          const products = await productService.getSearchedProducts();

          if (products && products.length > 0) {
            patchState(store, {
              productsMostSearched: products as Array<ProductWithNameDto>,
              hasSearchedData: true,
              isLoading: false,
            });
          } else {
            patchState(store, {
              hasSearchedData: false,
              isLoading: false,
            });
          }
        } catch (err: any) {
          if (err.status == 404) {
            patchState(store, {
              hasSearchedData: false,
              isLoading: false,
            });
          }
        }
      },

      async searchProducts() {
        try {
          patchState(store, {
            isLoading: true,
          });

          const products = await productService.getProducts(store.term(),  store.paginationProducts.pageSize(),store.paginationProducts.pageNumber());

          if (products && products.datas && products.datas.length > 0) {
            patchState(store, {
              products: products as ArrayProductWithVarietyDto,
              hasData: true,
              paginationProducts: {
                pageCount: products.pageCount as number,
                pageNumber: store.paginationProducts().pageNumber,
                pageSize: store.paginationProducts().pageSize,
                totalCount: products.count,
              },
              isLoading: false,
            });
          } else {
            patchState(store, {
              hasData: false,
              isLoading: false,
            });
          }
        } catch (err: any) {
          if (err.status == 404) {
            patchState(store, {
              hasData: false,
              isLoading: false,
            });
          }
        }
      },

      async GetProductDetails(productId: string) {
        if (productId) {
          patchState(store, {
            isLoading: true,
          });

          const details = await productService.getProductDetails(productId);

          patchState(store, {
            details,
            hasDetails: true,
            isLoading: false,
          });
        }
      },

      async AddNewPackage(productId: string, newPackage: PackageDto) {
        try {
          const existingStock = await stockService.getStockByProduct(productId);

          if (existingStock) {
            await packageService.addNewPackage(
              existingStock.id as string,
              newPackage,
            );
          } else {
            const newStockId = await stockService.addNewStock({ productId });
            await packageService.addNewPackage(newStockId, newPackage);
          }
        } catch (err: any) {
          console.log(err.status);
          if (err.status == 404) {
            const newStockId = await stockService.addNewStock({ productId });
            await packageService.addNewPackage(newStockId, newPackage);
          }
        }
      },

      reinitialize() {
        patchState(store, {
          products: undefined,
          hasSearchedData: true,
          hasData: false,
          isLoading: false,
        });
      }})),
      withMethods(
        (
          store,
        ) => ({
      changePage(pageNumber: number) {
        patchState(store, {
          paginationProducts: { ...store.paginationProducts(), pageNumber },
        });
        store.searchProducts();
      },
      setCriteriasProduct(term: string, pageNumber: number, pageSize: number) {
        patchState(store, {
          term,
          paginationProducts: {
            pageNumber,
            pageSize,
            pageCount: 0,
            totalCount: 0,
          },
        });
        store.searchProducts();
      },

    }),
  ),
);
