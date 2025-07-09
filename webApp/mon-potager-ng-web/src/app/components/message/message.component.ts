import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageDto } from '../../data/data-contracts';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'lcdj-message',
  imports: [ButtonModule, ImageComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  message = input.required<MessageDto>();
}
