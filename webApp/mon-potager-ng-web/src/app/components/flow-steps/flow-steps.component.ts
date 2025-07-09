import { Component, Inject, inject, Input, output } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { inprogressStore } from '../../pages/in-progress/in-progress.store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCarrot } from '@fortawesome/free-solid-svg-icons';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'lcdj-flow-steps',
  imports: [
    TimelineModule,
    DatePipe,
    ButtonModule,
    FontAwesomeModule,
    ImageComponent,
  ],
  templateUrl: './flow-steps.component.html',
  styleUrl: './flow-steps.component.scss',
})
export class FlowStepsComponent {
  store = inject(inprogressStore);

  faCarrot = faCarrot;

  _flowid: string = '';
  get flowId(): string {
    return this._flowid;
  }

  @Input()
  set flowId(flowId: string) {
    this._flowid = flowId;

    this.store.GetFlowDetails(flowId);
  }

  onAddStep = output();

  addNewStep() {
    this.onAddStep.emit();
  }
}
