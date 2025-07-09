import { Component, Inject, input } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { FlowDto } from '../../data/data-contracts';
import { CategoryColorDirective } from '../../directives/category-color/category-color.directive';
import { DateCustomPipe } from '../../pipes/date-custom.pipe';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-flow',
  imports: [
    CommonModule,
    AvatarModule,
    PanelModule,
    DateCustomPipe,
    ToolbarModule,
    CategoryColorDirective,
    ImageComponent,
  ],
  standalone: true,
  templateUrl: './flow.component.html',
  styleUrl: './flow.component.scss',
  host: {
    class: 'over',
  },
  providers: [DatePipe],
})
export class FlowComponent {
  model = input.required<FlowDto>();
}
