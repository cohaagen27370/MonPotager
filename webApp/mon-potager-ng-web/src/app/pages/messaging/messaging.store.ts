import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { MessageDto } from '../../data/data-contracts';

import { inject } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';

export interface MessagingState {
  messages: Array<MessageDto>;
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
  hasData: boolean;
  isLoading: boolean;
}

export const MessagingStateInitial: MessagingState = {
  messages: [],
  pageNumber: 0,
  pageSize: 10,
  pageCount: 0,
  totalCount: 0,
  hasData: false,
  isLoading : false
};

export const messagingStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(MessagingStateInitial),
  withMethods((store, messageService = inject(MessagingService)) => ({
    changePage(pageNumber: number) {
      patchState(store, { pageNumber });
      this.getAllMessages();
    },

    setCriterias(pageNumber: number, pageSize: number) {
      patchState(store, {
        pageNumber,
        pageSize,
      });

      this.getAllMessages();
    },

    async getAllMessages() {
      try {
        patchState(store, { isLoading: true });

        const arrayOfMessages = await messageService.getMessages(
          store.pageNumber() + 1,
          store.pageSize(),
        );

        if (arrayOfMessages && arrayOfMessages.count > 0) {
          patchState(store, {
            messages: arrayOfMessages.datas as Array<MessageDto>,
            pageCount: arrayOfMessages.pageCount,
            totalCount: arrayOfMessages.count,
            hasData: true,
            isLoading : false
          });
        } else {
          patchState(store, {
            hasData: false,
            pageCount: 0,
            totalCount: 0,
            isLoading: false
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
  })),
);
