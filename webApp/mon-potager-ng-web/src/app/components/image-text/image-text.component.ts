import { Component, Inject, input } from '@angular/core';

@Component({
  selector: 'lcdj-image-text',
  imports: [],
  templateUrl: './image-text.component.html',
  styleUrl: './image-text.component.scss'
})
export class ImageTextComponent {
  reference = input.required<string | undefined | null>();
  texte = input<string | undefined | null>(undefined);
  noCache = input<boolean>(false);
  width = input<number>(75);

  constructor(@Inject('IMG_API_URL') public imageUrl: string) {}

  getProductImage() {
    if (this.reference()) {
      return this.noCache()
        ? `${this.imageUrl}${this.reference()}.jpg?timespan=${new Date().getTime()}`
        : `${this.imageUrl}${this.reference()}.jpg`;
    }

    return '';
  }
}
