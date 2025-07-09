import { AfterViewChecked, AfterViewInit, Component, computed, ElementRef, inject, input, OnInit, Renderer2, resource, Sanitizer, signal } from '@angular/core';
import { EphemeridsService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'lcdj-meteo',
  imports: [],
  templateUrl: './meteo.component.html',
  styleUrl: './meteo.component.scss',
  host: { class: 'w-full' }
})
export class MeteoComponent {

}


