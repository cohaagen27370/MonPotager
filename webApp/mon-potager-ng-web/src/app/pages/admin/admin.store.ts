import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

import { computed, inject, resource } from '@angular/core';
import {
  CategoryDto,
  FamilyDto,
  VariantDto,
  ArrayFamilyDto,
} from '../../data/data-contracts';
import { AdminService } from '../../services/admin.service';
import { RepositoryService } from '../../services/repository.service';
import { error } from 'console';

export interface AdminState {
  products: Array<VariantDto>;
  families: Array<FamilyDto>;
  allFamilies: Array<FamilyDto>;
  categories: Array<CategoryDto>;
  selectedProduct: {
    id: string | undefined;
    current: VariantDto | undefined;
  };
  selectedFamily: {
    id: string | undefined;
    current: FamilyDto | undefined;
  };
  isLoading: boolean;
  paginationFamilies: {
    pageNumber: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
  };
  paginationProducts: {
    pageNumber: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
  };
}

export const AdminStateInitial: AdminState = {
  products: [],
  families: [],
  allFamilies: [],
  categories: [],
  selectedProduct: {
    id: '',
    current: undefined,
  },
  selectedFamily: {
    id: '',
    current: undefined,
  },
  isLoading: false,
  paginationFamilies: {
    pageNumber: 0,
    pageSize: 6,
    pageCount: 1,
    totalCount: 0,
  },
  paginationProducts: {
    pageNumber: 0,
    pageSize: 6,
    pageCount: 1,
    totalCount: 0,
  },
};

export const adminStore = signalStore(
  withState(AdminStateInitial),
  withMethods(
    (
      store,
      adminService = inject(AdminService),
      repoService = inject(RepositoryService),
    ) => ({
      async getAllCategories() {
        const results = await repoService.getCategories();

        patchState(store, {
          categories: results,
        });
      },
      async getAllProducts() {
        patchState(store, {
          isLoading: true,
        });

        const results = await adminService.getAllProducts(
          store.paginationProducts.pageNumber(),
          store.paginationProducts.pageSize(),
        );

        patchState(store, {
          products: results.datas as Array<VariantDto>,
          paginationProducts: {
            pageCount: results.pageCount as number,
            pageNumber: store.paginationProducts().pageNumber,
            pageSize: store.paginationProducts().pageSize,
            totalCount: results.count,
          },
          isLoading: false,
        });
      },
      async getAllFamilies() {
        patchState(store, {
          isLoading: true,
        });

        const results = await adminService.getAllFamilies(
          store.paginationFamilies.pageNumber(),
          store.paginationFamilies.pageSize(),
        );
        const resultsAll = await adminService.getAllFamilies(0, 200);

        patchState(store, {
          families: results.datas as Array<FamilyDto>,
          allFamilies: resultsAll.datas as Array<FamilyDto>,
          paginationFamilies: {
            pageCount: results.pageCount as number,
            pageNumber: store.paginationFamilies().pageNumber,
            pageSize: store.paginationFamilies().pageSize,
            totalCount: results.count,
          },
          isLoading: false,
        });
      },
    }),
  ),
  withMethods((store, adminService = inject(AdminService)) => ({
    changeFamilyPage(pageNumber: number) {
      patchState(store, {
        paginationFamilies: { ...store.paginationFamilies(), pageNumber },
      });
      store.getAllFamilies();
    },
    changeProductPage(pageNumber: number) {
      patchState(store, {
        paginationProducts: { ...store.paginationProducts(), pageNumber },
      });
      store.getAllProducts();
    },
    setCriteriasProduct(pageNumber: number, pageSize: number) {
      patchState(store, {
        paginationProducts: {
          pageNumber,
          pageSize,
          pageCount: 0,
          totalCount: 0,
        },
      });
      store.getAllProducts();
    },
    setCriteriasFamily(pageNumber: number, pageSize: number) {
      patchState(store, {
        paginationFamilies: {
          pageNumber,
          pageSize,
          pageCount: 0,
          totalCount: 0,
        },
      });
      store.getAllFamilies();
    },
    async addNewFamily(family: FamilyDto) {
      patchState(store, {
        isLoading: true,
      });

      await adminService.addNewFamily(family);
      await store.getAllFamilies();
    },
    async deleteFamily(familyId: string) {
      patchState(store, {
        isLoading: true,
      });

      await adminService.deleteFamily(familyId);
      await store.getAllFamilies();
    },
    async addNewProduct(variant: VariantDto, familyId: string) {
      patchState(store, {
        isLoading: true,
      });

      await adminService.addNewProduct(variant, familyId);
      await store.getAllProducts();
    },
    async UpdateFamily(familyId: string, family: FamilyDto) {
      patchState(store, {
        isLoading: true,
      });

      await adminService.updateFamily(family, familyId);
      await store.getAllFamilies();
    },

    async updateProduct(variant: VariantDto, productId: string) {
      patchState(store, {
        isLoading: true,
      });

      const product = await adminService.updateProduct(variant, productId);
      await store.getAllProducts();

      return product;
    },
    selectProduct(variant: VariantDto | undefined) {
      patchState(store, {
        selectedProduct: {
          id: variant ? (variant.id as string) : undefined,
          current: variant,
        },
      });
    },
    selectFamily(family: FamilyDto | undefined) {
      patchState(store, {
        selectedFamily: {
          id: family ? (family.id as string) : undefined,
          current: family,
        },
      });
    },
  })),
);
