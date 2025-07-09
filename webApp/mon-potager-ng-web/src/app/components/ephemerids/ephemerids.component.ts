import {
  Component,
  HostBinding,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';

import { EphemeridsDto } from '../../data/data-contracts';
import { EphemeridsService } from '../../services';
import { PanelModule } from 'primeng/panel';
import { ExtraMinutePipe } from '../../pipes/extra-minute.pipe';
import { MeteoComponent } from '../meteo/meteo.component';

@Component({
  selector: '[lcdj-ephemerids]',
  imports: [PanelModule, ExtraMinutePipe, MeteoComponent],
  templateUrl: './ephemerids.component.html',
  styleUrl: './ephemerids.component.scss',
})
export class EphemeridsComponent implements OnInit {
  service = inject(EphemeridsService);

  ephemerids = signal<EphemeridsDto | undefined>(undefined);

  isDrawer = input<boolean>(false);

  ngOnInit(): void {
    this.service
      .getEphemerids()
      .then((ephemerids) => this.ephemerids.set(ephemerids));
  }

  @HostBinding('attr.class') get classes(): string {
    return [
      'bg-white h-screen',
      !this.isDrawer()
        ? 'hidden lg:visible xl:visible xl:flex lg:flex lg:flex-column lg:w-3 xl:flex-column xl:w-3 shadow-4'
        : '',
    ]
      .filter(Boolean)
      .join(' ')
      .trim();
  }

  getSeasonsName(season: string | undefined | null) {
    switch (season) {
      case 'Winter':
        return 'Hiver';
      case 'Summer':
        return 'Eté';
      case 'Autumn':
        return 'Automne';
      case 'Spring':
        return 'Printemps';
      default:
        return '';
    }
  }

  toString(value: undefined | null | string) {
    if (value) return value;

    return '';
  }
}
