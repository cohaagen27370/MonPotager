import { Inject, inject, Injectable } from '@angular/core';
import { globalStore } from '../core/global.store';
import { CredentialDto, TokenDto } from '../data/data-contracts';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  globalStore = inject(globalStore);

  constructor(@Inject('BASE_API_URL') baseUrl: string) {
    super(baseUrl);
  }

  async login(credential: CredentialDto): Promise<TokenDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.services.login(credential);
        if (response.ok) {
          this.setSession(response.data as TokenDto);
          resolve(response.data as TokenDto);
        } else {
          reject(response.error);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  private setSession(result: TokenDto) {
    this.globalStore.setToken(result.token!, result.expires_in!);
  }
}
