import { Component, Input, input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinner } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';

@Component({
  selector: 'lcdj-loading-panel',
  imports: [
    DialogModule, ProgressSpinner, BlockUIModule
  ],
  templateUrl: './loading-panel.component.html',
  styleUrl: './loading-panel.component.scss'
})
export class LoadingPanelComponent {


  private _visible : boolean = false;
  public get visible() : boolean {
    return this._visible;
  }

  @Input("visible")
  public set visible(v : boolean) {

    if(!v) {
      setTimeout(() => {
        this._visible = v;
      }
      , 500);
    }
    else {
      this._visible = v;
    }

  }


}
