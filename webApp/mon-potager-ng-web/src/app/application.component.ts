import { AfterViewInit, Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

import { Title } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { ContainerComponent } from './components/container/container.component';
import { globalStore } from './core/global.store';
import { DrawerModule } from 'primeng/drawer';
import { EphemeridsComponent } from './components/ephemerids/ephemerids.component';
import { PrimeNG } from 'primeng/config';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { StorageService } from './services';
import { ToastModule } from 'primeng/toast';
import {
  faMessage,
  faBook,
  faGears,
  faCubesStacked,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';

@Component({
  selector: 'lcdj-application',
  imports: [
    RouterOutlet,
    ToolBarComponent,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    IconFieldModule,
    InputIconModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    FloatLabelModule,
    InputTextModule,
    TabMenuModule,
    TabsModule,
    ContainerComponent,
    EphemeridsComponent,
    DrawerModule,
    RouterModule,
    CardModule,
    ToastModule,
    FontAwesomeModule,
  ],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
  providers: [MessageService],
})
export class ApplicationComponent implements AfterViewInit {
  router = inject(Router);
  globalStore = inject(globalStore);
  storage = inject(StorageService);

  activeItem: MenuItem | undefined;
  mustShowDisclaimer: boolean = true;

  nav: (MenuItem & { faIcon: IconDefinition })[] = [
    {
      id: 'message',
      label: 'Message',
      faIcon: faMessage,
      routerLink: 'messages',
    },
    {
      id: 'inprogress',
      label: 'Cultures & préparations',
      faIcon: faSeedling,
      routerLink: 'inprogress',
    },
    {
      id: 'stocks',
      label: 'Stocks de graine',
      faIcon: faCubesStacked,
      routerLink: 'stocks',
    },
    {
      id: 'catalog',
      label: 'Plantothèque',
      faIcon: faBook,
      routerLink: 'catalog',
    },
  ];

  navNotConnected: (MenuItem & { faIcon: IconDefinition })[] = [
    {
      id: 'catalog',
      label: 'Plantothèque',
      faIcon: faBook,
      routerLink: 'catalog',
    },
  ];

  navConnectedAsAdmin: (MenuItem & { faIcon: IconDefinition })[] = [
    {
      id: 'message',
      label: 'Message',
      faIcon: faMessage,
      routerLink: 'messages',
    },
    {
      id: 'catalog',
      label: 'Plantothèque',
      faIcon: faBook,
      routerLink: 'catalog',
    },
    {
      id: 'admin',
      label: 'Administration',
      faIcon: faGears,
      routerLink: 'admin',
    },
  ];

  showEphemeridsDrawer: boolean = false;

  constructor(
    private readonly title: Title,
    private readonly primeng: PrimeNG,
    private readonly messageService: MessageService,
  ) {
    this.title.setTitle('Le compagnon du jardinier');
    this.primeng.zIndex = {
      modal: 1500, // dialog, sidebar
      overlay: 1600, // dropdown, overlaypanel
      menu: 1600, // overlay menus
      tooltip: 1700, // tooltip
    };
  }

  ngAfterViewInit() {
    this.mustShowDisclaimer = this.storage.getShortLivedItem('disclaimer')
      ? true
      : Boolean(this.storage.getShortLivedItem('disclaimer'));

    if (!this.mustShowDisclaimer) {
      this.messageService.add({
        key: 'confirm',
        sticky: true,
        severity: 'success',
      });
      this.mustShowDisclaimer = false;
    }
  }

  onActiveItemChange(event: MenuItem) {
    if (event?.id) this.router.navigate([event.id]);
  }

  onCloseDisclaimer() {
    this.mustShowDisclaimer = false;
    this.messageService.clear('confirm');
    this.storage.setShortLivedItem('disclaimer', 'false');
  }

  setValue(event: string | number) {
    this.globalStore.selectMenu(event as string);
  }
}
