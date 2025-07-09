import { Inject, Injectable } from '@angular/core';
import { PackageDto, StockQuantityDto } from '../data/data-contracts';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class PackageService extends BaseService {
  constructor(@Inject('BASE_API_URL') baseUrl: string) {
    super(baseUrl);
  }

  async addNewPackage(stockId: string, newPackage: PackageDto): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.addNewPackageInStock(
        stockId,
        newPackage,
      );

      if (response.ok) {
        resolve(response.data as string);
      } else {
        reject(response.error);
      }
    });
  }

  async updatePackage(
    packageId: string,
    quantity: StockQuantityDto,
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.updatePackage(packageId, quantity);

      if (response.ok) {
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  }
}
