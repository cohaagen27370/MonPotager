import { Component, Inject, OnInit, inject, signal } from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DataViewModule } from 'primeng/dataview';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DrawerModule } from 'primeng/drawer';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToggleButton } from 'primeng/togglebutton';
import { map } from 'rxjs';
import { AddFlowComponent } from '../../components/add-flow/add-flow.component';
import { FlowStepsComponent } from '../../components/flow-steps/flow-steps.component';
import { FlowComponent } from '../../components/flow/flow.component';
import { Flow, FlowDto } from '../../data/data-contracts';
import { DateCustomPipe } from '../../pipes/date-custom.pipe';
import { inprogressStore } from './in-progress.store';
import { ImageComponent } from '../../components/image/image.component';
import { Meta } from '@angular/platform-browser';
import { ImageTextComponent } from '../../components/image-text/image-text.component';
import { LoadingPanelComponent } from '../../components/loading-panel/loading-panel.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-in-progress',
  imports: [
    DataViewModule,
    SelectButtonModule,
    TagModule,
    InputTextModule,
    RatingModule,
    ButtonModule,
    FormsModule,
    AvatarModule,
    DialogModule,
    CalendarModule,
    FloatLabelModule,
    ToggleButton,
    DatePickerModule,
    FlowComponent,
    DrawerModule,
    FlowStepsComponent,
    AddFlowComponent,
    PaginatorModule,
    TableModule,
    DateCustomPipe,
    ImageComponent,
    ImageTextComponent,
    LoadingPanelComponent,
    RouterModule
  ],
  standalone: true,
  templateUrl: './in-progress.component.html',
  styleUrl: './in-progress.component.scss',
  host: {
    class: 'w-full',
  },
  providers: [DatePipe],
})
export class InProgressComponent implements OnInit {
  store = inject(inprogressStore);
  meta = inject(Meta);

  showSteps: boolean = false;
  selectedFlowId = signal<string>('');
  selectedFlow!: Flow;

  showAddSteps: boolean = false;

  stepDate: Date = new Date();
  now: Date = new Date();

  breakpointObserver = inject(BreakpointObserver);

  isDesktop = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  _displayMode: 'table' | 'tuiles' = 'tuiles';
  get displayMode(): 'table' | 'tuiles' {
    return this._displayMode;
  }
  set displayMode(displayMode: 'table' | 'tuiles') {
    this._displayMode = displayMode;
  }

  _harvested: boolean = false;
  get harvested(): boolean {
    return this._harvested;
  }
  set harvested(harvested: boolean) {
    this._harvested = harvested;
    this.reloadProduct();
  }

  _currentYear: Date = new Date();
  get currentYear(): Date {
    return this._currentYear;
  }
  set currentYear(currentYear: Date) {
    this._currentYear = currentYear;
    this.reloadProduct();
  }

  async reloadProduct() {
    this.store.setCriterias(
      0,
      6,
      this._currentYear.getFullYear(),
      !this.harvested,
    );
  }

  ngOnInit(): void {
    this.meta.addTags([
          { name: 'description', content: 'Gestion des cultures en cours.' },
          { name: 'keywords', content: 'semis, plantation, étape, récolte, arrosage, fertilisation, compostage, date, alertes' },
          { property: 'og:title', content: 'Gestion des cultures et des préparations en cours, consultation des cultures passées, suivi des étapes du semis jusqu\à la récolte' },
          { property: 'og:description', content: 'Suivi de la croissance et des actions sur les cultures et les préparations, du début jusqu\'à la fin' },
          { property: 'og:image', content: 'https://monpotager.alwaysdata.net/assets/LogoMonPotagerTransp.png' },
          { property: 'og:url', content: 'https://monpotager.alwaysdata.net/#/inprogress' }
        ]);

    this.reloadProduct();
  }

  constructor(@Inject('IMG_API_URL') public imageUrl: string) {}

  getProductImage(flow: FlowDto) {
    return `${this.imageUrl}${flow.image}.jpg`;
  }

  selectRow(event: TableRowSelectEvent) {
    if (event.data.id) {
      this.selectedFlowId.set(event.data.id);
      this.showSteps = true;
    }
  }

  selectFlow(id: string | null | undefined) {
    if (id) {
      this.selectedFlowId.set(id);
      this.showSteps = true;
    }
  }

  getStepImage(flow: FlowDto) {
    return `${this.imageUrl}${flow.startStage?.image}.jpg`;
  }

  onPageChange(event: PaginatorState) {
    this.store.changePage(event.page as number);
  }
}
