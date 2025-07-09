import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { map } from 'rxjs';
import { StockComponent } from '../../components/stock/stock.component';
import { UpdatePackageComponent } from '../../components/update-package/update-package.component';
import { StocksStateDto } from '../../data/data-contracts';
import { stocksStore } from './stocks.store';
import { ImageComponent } from '../../components/image/image.component';
import { Meta } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoadingPanelComponent } from '../../components/loading-panel/loading-panel.component';
import { globalStore } from '../../core/global.store';

@Component({
  selector: 'app-stocks',
  imports: [
    StockComponent,
    FormsModule,
    PaginatorModule,
    DrawerModule,
    UpdatePackageComponent,
    TableModule,
    DatePipe,
    ImageComponent,
    ButtonModule,
    RouterModule,
    ToastModule,
    LoadingPanelComponent,
  ],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss',
  host: {
    class: 'w-full',
  },
})
export class StocksComponent implements OnInit {
  store = inject(stocksStore);
  globalStore = inject(globalStore);
  messageService = inject(MessageService);
  meta = inject(Meta);

  router = inject(Router);

  breakpointObserver = inject(BreakpointObserver);

  isDesktop = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  _notEmpty: boolean = false;
  get notEmpty(): boolean {
    return this._notEmpty;
  }
  set notEmpty(notEmpty: boolean) {
    this._notEmpty = notEmpty;
    this.reloadStock();
  }

  showUpdate: boolean = false;

  async reloadStock() {
    this.store.setCriterias(0, 6, !this.notEmpty);
  }

  ngOnInit(): void {
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Gestion des stocks de graine et des matières premières pour les préparations.',
      },
      {
        name: 'keywords',
        content: 'stocks, graine, plante, gestion, quantité, semis',
      },
      {
        property: 'og:title',
        content: 'Gestion des stocks de graine en votre possession',
      },
      {
        property: 'og:description',
        content:
          'Ajustement, alimentation et gestion des stocks de mes graines et de mes matières premières pour les préparations.',
      },
      {
        property: 'og:image',
        content:
          'https://monpotager.alwaysdata.net/assets/LogoMonPotagerTransp.png',
      },
      {
        property: 'og:url',
        content: 'https://monpotager.alwaysdata.net/#/stocks',
      },
    ]);

    this.reloadStock();
  }

  onPageChange(event: PaginatorState) {
    this.store.changePage(event.page as number);
  }

  updateStock(stock: StocksStateDto) {
    this.store.selectStock(stock);
    this.showUpdate = true;
  }

  selectRow(event: TableRowSelectEvent) {
    if (event.data.id) {
      this.updateStock(event.data);
    }
  }

  viewDetails(id: string) {
    this.router.navigate(['app', 'product-details', id]);
  }

  addFlow() {
    this.showUpdate = false;
    this.messageService.add({
      key: 'addCulture',
      sticky: true,
      severity: 'success',
    });
  }

  gotToInProgress() {
    this.globalStore.selectMenu('stocks');
    this.router.navigate(['/app/stocks']);
  }
}
