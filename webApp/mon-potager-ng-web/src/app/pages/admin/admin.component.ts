import { Component, OnInit, inject } from '@angular/core';

import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { adminStore } from './admin.store';
import { TabsModule } from 'primeng/tabs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import {
  faAppleWhole,
  faCarrot,
  faFlask,
} from '@fortawesome/free-solid-svg-icons';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectModule } from 'primeng/select';
import { FamilyDto, VariantDto } from '../../data/data-contracts';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FamilyFormComponent } from '../../forms/family-form/family-form.component';
import { ImageComponent } from '../../components/image/image.component';
import { VariantFormComponent } from '../../forms/variant-form/variant-form.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'lcdj-admin',
  imports: [
    TableModule,
    TabsModule,
    PaginatorModule,
    FaIconComponent,
    InputTextModule,
    TextareaModule,
    IftaLabelModule,
    SelectModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    FamilyFormComponent,
    ImageComponent,
    VariantFormComponent,
    DialogModule,
    ToastModule,
    SkeletonModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  host: {
    class: 'w-full',
  },
  providers: [adminStore],
})
export class AdminComponent implements OnInit {
  messageService = inject(MessageService);

  faVegetable = faCarrot;
  faFruit = faAppleWhole;
  faPreparation = faFlask;

  showFamilyModification: boolean = false;
  showVariantModification: boolean = false;

  ngOnInit(): void {
    this.store.getAllCategories();
    this.store.setCriteriasFamily(0, 6);
    this.store.setCriteriasProduct(0, 6);
  }

  store = inject(adminStore);

  getIcon(category: string) {
    switch (category) {
      case 'vegetable':
        return this.faVegetable;
      case 'fruit':
        return this.faFruit;
      default:
        return this.faPreparation;
    }
  }

  selectFamily(event: TableRowSelectEvent) {
    if (event.data.id) {
      this.store.selectFamily(event.data);
      this.showFamilyModification = true;
    }
  }

  selectProduct(event: TableRowSelectEvent) {
    if (event.data.id) {
      this.store.selectProduct(event.data);
      this.showVariantModification = true;
    }
  }

  newFamily() {
    this.store.selectFamily(undefined);
    this.showFamilyModification = true;
  }

  newVariant() {
    this.store.selectProduct(undefined);
    this.showVariantModification = true;
  }

  async deleteFamily(familyId: string) {
    await this.store.deleteFamily(familyId);

    this.messageService.add({
      severity: 'success',
      summary: 'Opération réussie',
      detail: 'Famille supprimée',
    });
  }

  async saveFamily(family: FamilyDto) {
    if (family.id) {
      await this.store.UpdateFamily(family.id, family);
    } else {
      await this.store.addNewFamily(family);
    }
    this.showFamilyModification = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Opération réussie',
      detail: 'Famille sauvegardée',
    });
  }

  async saveVariant(variant: VariantDto) {
    if (variant.id) {
      await this.store.updateProduct(variant, variant.id);
    } else {
      await this.store.addNewProduct(variant, variant.familyId as string);
    }

    this.showVariantModification = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Opération réussie',
      detail: 'Variété sauvegardée',
    });
  }

  onPageFamilyChange(event: PaginatorState) {
    this.store.changeFamilyPage(event.page as number);
  }

  onPageProductChange(event: PaginatorState) {
    this.store.changeProductPage(event.page as number);
  }
}
