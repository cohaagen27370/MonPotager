import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SimpleToolBarComponent } from './components/simple-tool-bar/simple-tool-bar.component';

@Component({
  selector: 'lcdj-cover',
  imports: [RouterOutlet, SimpleToolBarComponent],
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.scss'
})
export class CoverComponent {

}
