import { Inject, Injectable } from '@angular/core';
import {
  ArrayFamilyDto,
  ArrayVariantDto,
  FamilyDto,
  Variant,
  VariantDto,
} from '../data/data-contracts';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseService {
  constructor(@Inject('BASE_API_URL') baseUrl: string) {
    super(baseUrl);
  }

  async getAllProducts(
    pageNumber: number,
    pageSize: number,
  ): Promise<ArrayVariantDto> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.getAllProducts({
        pageNumber,
        pageSize,
      });

      if (response.ok) {
        resolve(response.data as ArrayVariantDto);
      } else {
        reject(response.error);
      }
    });
  }

  async getAllFamilies(
    pageNumber: number,
    pageSize: number,
  ): Promise<ArrayFamilyDto> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.getAllFamilies({
        pageNumber,
        pageSize,
      });

      if (response.ok) {
        resolve(response.data as ArrayFamilyDto);
      } else {
        reject(response.error);
      }
    });
  }

  async addNewFamily(family: FamilyDto): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.addNewFamily(family);

      if (response.ok) {
        resolve(response.data as string);
      } else {
        reject(response.error);
      }
    });
  }
  async updateFamily(family: FamilyDto, familyId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.updateFamily(familyId, family);

      if (response.ok) {
        resolve();
      } else {
        reject(response.error);
      }
    });
  }
  async deleteFamily(familyId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.deleteFamily(familyId);

      if (response.ok) {
        resolve();
      } else {
        reject(response.error);
      }
    });
  }

  async addNewProduct(variant: VariantDto, familyId: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.addNewProduct(familyId, variant);

      if (response.ok) {
        resolve(response.data as string);
      } else {
        reject(response.error);
      }
    });
  }

  async updateProduct(
    variant: VariantDto,
    productId: string,
  ): Promise<VariantDto> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.updateProduct(productId, variant);

      if (response.ok) {
        resolve(response.data as VariantDto);
      } else {
        reject(response.error);
      }
    });
  }
}
