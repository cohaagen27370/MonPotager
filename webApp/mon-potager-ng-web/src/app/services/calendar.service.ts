import { Inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CalendarDto } from '../data/data-contracts';

@Injectable({
  providedIn: 'root'
})
export class CalendarService extends BaseService {

  constructor(@Inject('BASE_API_URL') baseUrl: string) {
    super(baseUrl);
  }

  async getCalendarForOne(
    productId: string
  ): Promise<CalendarDto> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.getCalendarForOneProduct(productId);

      if (response.ok) {
        resolve(response.data as CalendarDto);
      } else {
        reject(response.error);
      }
    });
  }
}
