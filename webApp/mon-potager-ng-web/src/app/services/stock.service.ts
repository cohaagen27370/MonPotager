import { Inject, Injectable } from '@angular/core';
import { ArrayStockDto, NewStockDto, StockDto } from '../data/data-contracts';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class StockService extends BaseService {
  constructor(@Inject('BASE_API_URL') baseUrl: string) {
    super(baseUrl);
  }

  async getAllStocks(
    pageNumber: number,
    pageSize: number,
    notEmptyOnly: boolean,
  ): Promise<ArrayStockDto> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.getAllStocks({
        pageNumber,
        pageSize,
        notEmptyOnly,
      });

      if (response.ok) {
        resolve(response.data as ArrayStockDto);
      } else {
        reject(response.error);
      }
    });
  }

  async getStockByProduct(productId: string): Promise<StockDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.services.getAStockForAProduct(productId);

        if (response.ok) {
          resolve(response.data as StockDto);
        } else {
          reject(response.error);
        }
      } catch (err: any) {
        reject(err);
      }
    });
  }

  async getStockDetail(stockId: string): Promise<StockDto> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.getAStockById(stockId);

      if (response.ok) {
        resolve(response.data as StockDto);
      } else {
        reject(response.error);
      }
    });
  }

  async addNewStock(newStock: NewStockDto): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.addANewStock(newStock);

      if (response.ok) {
        resolve(response.data as string);
      } else {
        reject(response.error);
      }
    });
  }
}
