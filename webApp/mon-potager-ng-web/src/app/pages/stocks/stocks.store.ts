import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  NewFlowDto,
  StageDto,
  StockDto,
  StocksStateDto
} from '../../data/data-contracts';
import { FlowService, PackageService, StockService } from '../../services';

import { inject } from '@angular/core';

export interface DataStocksState {
  stocks: Array<StocksStateDto>;
  details: StockDto | undefined;
  selectedStock: StocksStateDto | undefined;
  startsSteps: Array<StageDto>;
  hasData: boolean;
  hasDetails: boolean;
  pageNumber: number;
  pageSize: number;
  notEmpty: boolean;
  pageCount: number;
  totalCount: number;
  isLoading: boolean;
}

export const StocksStateInitial: DataStocksState = {
  stocks: [],
  details: undefined,
  selectedStock: undefined,
  startsSteps: [],
  hasData: false,
  hasDetails: false,
  pageNumber: 0,
  pageSize: 10,
  notEmpty: true,
  pageCount: 0,
  totalCount: 0,
  isLoading: false,
};

export const stocksStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(StocksStateInitial),
  withMethods(
    (
      store,
      stockService = inject(StockService),
      packageService = inject(PackageService),
      flowService = inject(FlowService),
    ) => ({
      changePage(pageNumber: number) {
        patchState(store, { pageNumber });
        this.GetAllStocks();
      },
      setCriterias(pageNumber: number, pageSize: number, notEmpty: boolean) {
        patchState(store, {
          pageNumber,
          pageSize,
          notEmpty,
        });

        this.GetAllStocks();
      },
      selectStock(stock: StocksStateDto) {
        patchState(store, {
          selectedStock: stock,
        });
      },
      async AddNewFlow(newFlow: NewFlowDto) {
        patchState(store, { isLoading: true });
        await flowService.addNewFlow(newFlow);
        patchState(store, { isLoading: false });
      },
      async GetStartStages(categoryId: number) {
        const stages = await flowService.getStartSteps(categoryId);
        patchState(store, {
          startsSteps: stages,
        });
      },
      async GetAllStocks() {
        patchState(store, { isLoading: true });

        try {
          const arrayOfStocks = await stockService.getAllStocks(
            store.pageNumber() + 1,
            store.pageSize(),
            store.notEmpty(),
          );

          if (arrayOfStocks && arrayOfStocks.count > 0) {
            patchState(store, {
              stocks: arrayOfStocks.datas as Array<StocksStateDto>,
              pageCount: arrayOfStocks.pageCount,
              totalCount: arrayOfStocks.count,
              hasData: true,
              isLoading : false
            });
          } else {
            patchState(store, {
              hasData: false,
              pageCount: 0,
              totalCount: 0,
              isLoading : false
            });
          }
        } catch (err: any) {
          if (err.status == 404) {
            patchState(store, {
              hasData: false,
              pageCount: 0,
              totalCount: 0,
              isLoading : false
            });
          }
        }
      },
      async GetStockDetail(stockId: string) {
        if (stockId) {
          patchState(store, { isLoading: true });
          const details = await stockService.getStockDetail(stockId);
          patchState(store, {
            details,
            hasDetails: true,
            isLoading : false
          });
        }
      },
      async UpdatePackage(packageId: string, quantity: number) {
        if (packageId) {
          patchState(store, { isLoading: true });
          await packageService.updatePackage(packageId, {
            remainingQuantity: quantity,
          });
          if (store.selectedStock()) {
            this.GetAllStocks();
          }
          patchState(store, { isLoading: false });
        }
      },
    }),
  ),
);
