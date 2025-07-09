import { Inject, Injectable } from '@angular/core';
import {
  CaptchaDto,
  MeDto,
  ResetPasswordResponseDto,
  UserDto,
} from '../data/data-contracts';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(@Inject('BASE_API_URL') baseUrl: string) {
    super(baseUrl);
  }

  async captchaIsNOk(value: string, id: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.checkCaptcha({ id, value });

      if (response.ok) {
        resolve(response.data as boolean);
      } else {
        reject(response.error);
      }
    });
  }

  async emailAlreadyExists(email: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.checkEmail({ value: email });

      if (response.ok) {
        resolve(response.data as boolean);
      } else {
        reject(response.error);
      }
    });
  }

  async getCaptcha(): Promise<CaptchaDto> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.generateCaptcha();

      if (response.ok) {
        resolve(response.data as CaptchaDto);
      } else {
        reject(response.error);
      }
    });
  }

  async addNew(user: UserDto): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.addNewUser(user);

      if (response.ok) {
        resolve(response.data as string);
      } else {
        reject(response.error);
      }
    });
  }

  async getMe(): Promise<MeDto> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.getMe();

      if (response.ok) {
        resolve(response.data as MeDto);
      } else {
        reject(response.error);
      }
    });
  }

  async askForResetPassword(email: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.resetPassword({ email });

      if (response.ok) {
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  }

  async resetPassword(request: ResetPasswordResponseDto): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const response = await this.services.getResetPasswordResponse(request);

      if (response.ok) {
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  }
}
