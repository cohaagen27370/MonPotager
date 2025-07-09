import { Inject, Injectable } from '@angular/core';
import {
  CategoryDto,
  ForecastStationDto,
  ProductWithNameDto,
  StageDto,
  StationDto,
} from '../data/data-contracts';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService extends BaseService {
  constructor(@Inject('BASE_API_URL') baseUrl: string) {
    super(baseUrl);
  }

  async getNearestStation(
    latitude: number,
    longitude: number,
  ): Promise<ForecastStationDto> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.findNearestStation({
        latitude,
        longitude,
      });

      if (response.ok) {
        resolve(response.data as ForecastStationDto);
      } else {
        reject(response.error);
      }
    });
  }

  async getStations(): Promise<Array<ForecastStationDto>> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.getAllStations();

      if (response.ok) {
        resolve(response.data as Array<ForecastStationDto>);
      } else {
        reject(response.error);
      }
    });
  }

  async getCategories(): Promise<Array<CategoryDto>> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.getCategories();

      if (response.ok) {
        resolve(response.data as Array<CategoryDto>);
      } else {
        reject(response.error);
      }
    });
  }

  async getStagesByCategory(categoryId: number): Promise<Array<StageDto>> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.getStagesByCategory({
        category: categoryId,
      });

      if (response.ok) {
        resolve(response.data as Array<StageDto>);
      } else {
        reject(response.error);
      }
    });
  }

  async getFamilies(): Promise<Array<ProductWithNameDto>> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.getFamilies();

      if (response.ok) {
        resolve(response.data as Array<ProductWithNameDto>);
      } else {
        reject(response.error);
      }
    });
  }
}
