import { Component, inject, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CalendarDto } from '../../data/data-contracts';
import { CalendarService } from '../../services';
import { TooltipModule } from 'primeng/tooltip';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lcdj-calendar',
  imports: [DialogModule, ButtonModule, TooltipModule, NgClass],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  calendarService = inject(CalendarService);
  calendar: CalendarDto | undefined = undefined;

  private _productId: string = '';
  public get productId(): string {
    return this._productId;
  }

  getRange(n: number): number[] {
    return Array(n)
      .fill(0)
      .map((_, index) => index);
  }

  @Input()
  public set productId(v: string) {
    this._productId = v;

    console.log(this._productId);

    if (this._productId) {
      this.calendarService
        .getCalendarForOne(this._productId)
        .then((calendar) => {
          this.calendar = calendar;
        });
    }
  }
}
