import { Component, inject, OnInit } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ImageComponent } from '../../components/image/image.component';
import { DateCustomPipe } from '../../pipes/date-custom.pipe';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { messagingStore } from './messaging.store';
import { Meta } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { MessageComponent } from '../../components/message/message.component';
import { LoadingPanelComponent } from '../../components/loading-panel/loading-panel.component';

@Component({
  selector: 'lcdj-messaging',
  imports: [
    TagModule,
    PaginatorModule,
    TableModule,
    DateCustomPipe,
    ImageComponent,
    DateCustomPipe,
    MessageComponent,
    LoadingPanelComponent
  ],
  templateUrl: './messaging.component.html',
  styleUrl: './messaging.component.scss',
  host: {
    class: 'w-full',
  },
  providers: [DatePipe],
})
export class MessagingComponent implements OnInit {
  store = inject(messagingStore);
  meta = inject(Meta);

  breakpointObserver = inject(BreakpointObserver);

  isDesktop = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  async reloadProduct() {
    this.store.setCriterias(0, 6);
  }

  ngOnInit(): void {
    this.meta.addTags([
      {
        name :" google-site-verification",
        content:"dHvQKCxpTFEufTQdVeL8G9ZIMDtfnyzp3pP8GK4IWiA"
      },
      {
        name: 'description',
        content: 'Gestion des cultures en cours.' },
      {
        name: 'keywords',
        content:
          'semis, plantation, étape, récolte, arrosage, fertilisation, compostage, date, alertes',
      },
      {
        property: 'og:title',
        content:
          'Gestion des cultures et des préparations en cours, consultation des cultures passées, suivi des étapes du semis jusqu\à la récolte',
      },
      {
        property: 'og:description',
        content:
          "Suivi de la croissance et des actions sur les cultures et les préparations, du début jusqu'à la fin",
      },
      {
        property: 'og:image',
        content:
          'https://monpotager.alwaysdata.net/assets/LogoMonPotagerTransp.png',
      },
      {
        property: 'og:url',
        content: 'https://monpotager.alwaysdata.net/#/inprogress',
      },
    ]);

    this.reloadProduct();
  }

  onPageChange(event: PaginatorState) {
    this.store.changePage(event.page as number);
  }
}
