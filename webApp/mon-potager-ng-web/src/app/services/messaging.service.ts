import { Inject, inject, Injectable } from '@angular/core';
import { globalStore } from '../core/global.store';
import { ArrayMessageDto, MessageDto } from '../data/data-contracts';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class MessagingService extends BaseService {
  globalStore = inject(globalStore);

  constructor(@Inject('BASE_API_URL') baseUrl: string) {
    super(baseUrl);
  }

  async getMessages(
    pageNumber: number,
    pageSize: number,
  ): Promise<ArrayMessageDto> {
    return new Promise((resolve, reject) => {
      this.services
        .getMessages({ pageNumber, pageSize })
        .then((response) => {
          if (response.ok) {
            resolve(response.data);
          } else {
            reject(response.error);
          }
        })
        .catch((error) => reject(error));
    });
  }
}
