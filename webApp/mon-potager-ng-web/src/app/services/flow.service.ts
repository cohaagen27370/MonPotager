import { Inject, Injectable } from '@angular/core';
import {
  ArrayFlowDto,
  FlowDetailDto,
  NewFlowDto,
  NewStageDto,
  StageDto
} from '../data/data-contracts';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class FlowService extends BaseService {
  constructor(@Inject('BASE_API_URL') baseUrl: string) {
    super(baseUrl);
  }

  async addNewFlow(newFlow: NewFlowDto): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.services.addANewFlow(newFlow);

        if (response.ok) {
          resolve(response.data as string);
        } else {
          reject(response.error);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  async getAllFlows(
    pageNumber: number,
    pageSize: number,
    year: number = 9999,
    notHarvested: boolean = true,
  ): Promise<ArrayFlowDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.services.getAllFlows({
          pageNumber,
          pageSize,
          year,
          notHarvested,
        });

        if (response.ok) {
          resolve(response.data as ArrayFlowDto);
        } else {
          reject(response.error);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  async getFlowDetails(flowId: string): Promise<FlowDetailDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.services.getAFlow(flowId);

        if (response.ok) {
          resolve(response.data as FlowDetailDto);
        } else {
          reject(response.error);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  async getPossiblesSteps(flowId: string): Promise<Array<StageDto>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.services.getStagesPossibleByFlow(flowId);

        if (response.ok) {
          resolve(response.data as Array<StageDto>);
        } else {
          reject(response.error);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  async getStartSteps(categoryId: number): Promise<Array<StageDto>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.services.getStartStagesByCategory({
          category: categoryId,
        });

        if (response.ok) {
          resolve(response.data as Array<StageDto>);
        } else {
          reject(response.error);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  async addNewStep(flowId: string, newStage: NewStageDto): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.services.addAEventOnAFlow(flowId, newStage);

        if (response.ok) {
          resolve(response.data);
        } else {
          reject(response.error);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}
