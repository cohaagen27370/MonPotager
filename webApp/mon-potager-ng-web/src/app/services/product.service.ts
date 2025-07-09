import { Inject, Injectable } from '@angular/core';
import {
  ArrayProductWithVarietyDto,
  ProductWithDescriptionDto,
  ProductWithNameDto,
  ProductWithVarietyDto,
} from '../data/data-contracts';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  constructor(@Inject('BASE_API_URL') baseUrl: string) {
    super(baseUrl);
  }

  async getProducts(term: string, pageSize: number, pageNumber: number): Promise<ArrayProductWithVarietyDto> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.getVariantsByCriterias({ q: term, pageSize, pageNumber });

      if (response.ok) {
        resolve(response.data as ArrayProductWithVarietyDto);
      } else {
        reject(response.error);
      }
    });
  }

  async getSearchedProducts(): Promise<Array<ProductWithNameDto>> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.getMostSearchedProducts();

      if (response.ok) {
        resolve(response.data as Array<ProductWithNameDto>);
      } else {
        reject(response.error);
      }
    });
  }

  async getProductDetails(productId: string): Promise<ProductWithDescriptionDto> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.getProductById(productId);

      if (response.ok) {
        resolve(response.data as ProductWithDescriptionDto);
      } else {
        reject(response.error);
      }
    });
  }

  async getVariantsByFamily(
    familyName: string,
  ): Promise<Array<ProductWithNameDto>> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.getVariantsByFamilyName(familyName);

      if (response.ok) {
        resolve(response.data as Array<ProductWithNameDto>);
      } else {
        reject(response.error);
      }
    });
  }
}
