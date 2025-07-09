import { inject, Inject, Injectable } from '@angular/core';
import { EphemeridsDto } from '../data/data-contracts';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';
import { format } from 'date-fns/format';

@Injectable({
  providedIn: 'root',
})
export class EphemeridsService extends BaseService {
  //  private readonly geolocation$ = inject(GeolocationService);

  storageService = inject(StorageService);

  constructor(@Inject('BASE_API_URL') baseUrl: string) {
    super(baseUrl);
  }

  async getEphemerids(): Promise<EphemeridsDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const cache = this.storageService.getItem('Ephemerids');

        // cache présent
        if (cache) {
          // la date est bonne
          if (
            (JSON.parse(cache) as EphemeridsDto).currentDate ==
            format(new Date(), 'uuuu-MM-dd')
          ) {
            resolve(JSON.parse(cache) as EphemeridsDto);
          }
          // la date n'est pas bonne
          else {
            const response = await this.services.getEphemerids();

            if (response.ok) {
              this.storageService.setItem(
                'Ephemerids',
                JSON.stringify(response.data),
              );
              resolve(response.data as EphemeridsDto);
            } else {
              reject(response.error);
            }
          }
        }
        // pas de cache
        else {
          const response = await this.services.getEphemerids();

          if (response.ok) {
            this.storageService.setItem(
              'Ephemerids',
              JSON.stringify(response.data),
            );
            resolve(response.data as EphemeridsDto);
          } else {
            reject(response.error);
          }
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  async getCodeInsee(cityName:string) {
    const response = await fetch(`https://meteofrance.com/ajax/widgetAutocomplete/${cityName}`);

    if (response.ok) {
      const data = await response.json();
      return data[0].codeInsee;
    } else {
      throw new Error('Failed to fetch code Insee');
    }

  }

}
