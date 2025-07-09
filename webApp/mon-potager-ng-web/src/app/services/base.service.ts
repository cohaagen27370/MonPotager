import { Inject, inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { V1 } from '../data/V1';
import { BearerSecurityData } from '../types/bearer-security-data';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {
  private storage = inject(StorageService);
  protected services = new V1<BearerSecurityData>({
    securityWorker: () => {
      return {
        headers: {
          authorization: `Bearer ${this.storage.getItem('id_token') as string}`,
        },
      };
    },
  });

  constructor(@Inject('BASE_API_URL') protected baseUrl: string) {
    this.services.baseUrl = baseUrl;
  }
}
