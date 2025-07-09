import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { FlowDetailDto, FlowDto, StageDto } from '../../data/data-contracts';

import { inject } from '@angular/core';
import { format } from 'date-fns';
import { FlowService } from '../../services';

export interface InProgressState {
  flows: Array<FlowDto>;
  details: FlowDetailDto | undefined;
  hasData: boolean;
  hasDetails: boolean;
  possiblesSteps: Array<StageDto>;
  pageNumber: number;
  pageSize: number;
  year: number;
  notHarvested: boolean;
  pageCount: number;
  totalCount: number;
  isLoading:boolean;
}

export const InProgressStateInitial: InProgressState = {
  flows: [],
  details: undefined,
  hasData: false,
  hasDetails: false,
  possiblesSteps: [],
  pageNumber: 0,
  pageSize: 10,
  year: new Date().getFullYear(),
  notHarvested: true,
  pageCount: 0,
  totalCount: 0,
  isLoading:false
};

export const inprogressStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(InProgressStateInitial),
  withMethods((store, flowService = inject(FlowService)) => ({
    changePage(pageNumber: number) {
      patchState(store, { pageNumber });
      this.getAllFlows();
    },

    setCriterias(
      pageNumber: number,
      pageSize: number,
      year: number,
      notHarvested: boolean,
    ) {
      patchState(store, {
        pageNumber,
        pageSize,
        year,
        notHarvested,
      });

      this.getAllFlows();
    },

    async getAllFlows() {
      try {
        patchState(store, { isLoading: true });

        const arrayOfFlows = await flowService.getAllFlows(
          store.pageNumber() + 1,
          store.pageSize(),
          store.year(),
          store.notHarvested(),
        );

        if (arrayOfFlows && arrayOfFlows.count > 0) {
          patchState(store, {
            flows: arrayOfFlows.datas as Array<FlowDto>,
            pageCount: arrayOfFlows.pageCount,
            totalCount: arrayOfFlows.count,
            hasData: true,
            hasDetails: false,
            isLoading: false,
          });
        } else {
          patchState(store, {
            hasData: false,
            hasDetails: false,
            pageCount: 0,
            totalCount: 0,
            isLoading: false,
          });
        }
      } catch (err: any) {
        if (err.status == 404) {
          patchState(store, {
            hasData: false,
            hasDetails: false,
            pageCount: 0,
            totalCount: 0,
            isLoading: false,
          });
        }
      }
    },
    async GetFlowDetails(flowId: string) {
      if (flowId) {
        patchState(store, {
          isLoading: true,
        });
        const details = await flowService.getFlowDetails(flowId);
        const possiblesSteps = await flowService.getPossiblesSteps(flowId);
        patchState(store, {
          possiblesSteps,
          details,
          hasDetails: true,
          isLoading: false,
        });
      }
    },
    async AddNewStep(flowId: string, date: Date, stageId: number) {
      patchState(store, {
        isLoading: true,
      });

      await flowService.addNewStep(flowId, {
        date: format(date, 'yyyy-MM-dd'),
        id: stageId,
      });

      await this.getAllFlows();
      await this.GetFlowDetails(flowId);
    },
  })),
);
