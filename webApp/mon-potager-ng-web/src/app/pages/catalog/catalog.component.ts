import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { map } from 'rxjs';
import { AddPackageComponent } from '../../components/add-package/add-package.component';
import { ProductSearchComponent } from '../../components/product-search/product-search.component';
import { PackageDto, ProductWithVarietyDto } from '../../data/data-contracts';
import { catalogStore } from './catalog.store';
import { globalStore } from '../../core/global.store';
import { ImageComponent } from '../../components/image/image.component';
import { Meta } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { LoadingPanelComponent } from '../../components/loading-panel/loading-panel.component';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-catalog',
  imports: [
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    CommonModule,
    ButtonModule,
    RippleModule,
    ProductSearchComponent,
    BlockUIModule,
    FluidModule,
    InputGroupModule,
    InputGroupAddonModule,
    IftaLabelModule,
    DrawerModule,
    AddPackageComponent,
    TableModule,
    ImageComponent,
    LoadingPanelComponent,
    ToastModule,
    RouterModule,
    PaginatorModule,
    CalendarComponent,
    DialogModule
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  host: {
    class: 'w-full',
  },
  providers: [catalogStore],
})
export class CatalogComponent implements OnInit {
  messageService$ = inject(MessageService);
  router = inject(Router);

  store = inject(catalogStore);
  globalStore = inject(globalStore);
  meta = inject(Meta);

  selectedProductName!: string;
  filteredProducts = signal<Array<ProductWithVarietyDto>>([]);

  showAddPackage: boolean = false;
  selectedProduct!: ProductWithVarietyDto;
  isShowCalendar : boolean = false;

  breakpointObserver = inject(BreakpointObserver);

  isDesktop = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  ngOnInit(): void {
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Catalogue des plantes potagères, des fruits et des préparations pour le potager.',
      },
      {
        name: 'keywords',
        content:
          'catalogue, liste, plantothèque, plante, fruit, préparation, rechercher, détails',
      },
      {
        property: 'og:title',
        content: 'Moteur de recherche des plantes potagères',
      },
      {
        property: 'og:description',
        content:
          "Recherche des plantes potagères, des fruits et des préparations pour le potager pour l'ajouter à son stock de graine",
      },
      {
        property: 'og:image',
        content:
          'https://monpotager.alwaysdata.net/assets/LogoMonPotagerTransp.png',
      },
      {
        property: 'og:url',
        content: 'https://monpotager.alwaysdata.net/#/catalog',
      },
    ]);

    this.store
      .getMostSearchProducts()
      .then(() => console.log('Most search ok'));
  }

  async viewDetailsProduct(productId: string | undefined | null) {
    if (productId) {
      this.router.navigate(['app', 'product-details', productId]);
    }
  }

  async viewDetails(productName: string) {
    this.selectedProductName = productName;
    this.searchProduct();
  }

  showCalendar(productId: string) {
    this.store.selectProduct(productId);
    this.isShowCalendar = true;
  }


  reinitProduct() {
    this.store.reinitialize();
    this.selectedProductName = '';
  }

  searchProduct() {
    if (this.selectedProductName) {
      this.store.setCriteriasProduct(this.selectedProductName, 0, 6);
    }
  }

  AddPackage(data: PackageDto) {
    this.store.AddNewPackage(this.selectedProduct.id as string, data);
    this.showAddPackage = false;

    this.messageService$.add({
      key: 'addStock',
      sticky: true,
      severity: 'success',
    });
  }

  constructor(@Inject('IMG_API_URL') public imageUrl: string) {}

  getProductImage(product: ProductWithVarietyDto) {
    return `${this.imageUrl}${product.image}.jpg`;
  }

  selectRow(event: TableRowSelectEvent) {
    if (event.data.name) {
      this.viewDetails(event.data.name);
    }
  }

  gotToStocks() {
    this.globalStore.selectMenu('stocks');
    this.router.navigate(['/app/stocks']);
  }

  onPageChange(event: PaginatorState) {
    this.store.changePage(event.page as number);
  }

}
