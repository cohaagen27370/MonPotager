import { Component, Inject, inject, Input, output } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { Avatar } from 'primeng/avatar';
import { DatePickerModule } from 'primeng/datepicker';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgClass, NgStyle } from '@angular/common';
import { inprogressStore } from '../../pages/in-progress/in-progress.store';

@Component({
  selector: 'lcdj-add-flow',
  imports: [
    MenuModule,
    Avatar,
    DatePickerModule,
    IftaLabelModule,
    FormsModule,
    ButtonModule,
    RadioButtonModule,
    NgStyle,
    NgClass,
  ],
  templateUrl: './add-flow.component.html',
  styleUrl: './add-flow.component.scss',
})
export class AddFlowComponent {
  dateEvent: Date = new Date();
  now: Date = new Date();

  store = inject(inprogressStore);
  stageId: number = 0;
  onStepAdd = output();

  constructor(@Inject('IMG_API_URL') public imageUrl: string) {}

  getImageSource(reference: string | undefined | null) {
    if (reference) return `${this.imageUrl}${reference}.jpg`;

    return '';
  }

  _flowid: string = '';
  get flowId(): string {
    return this._flowid;
  }

  @Input()
  set flowId(flowId: string) {
    this._flowid = flowId;
  }

  async addNewStep() {
    await this.store.AddNewStep(this._flowid, this.dateEvent, this.stageId);
    this.onStepAdd.emit();
  }
}
