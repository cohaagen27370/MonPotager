import { Component, HostBinding, Inject, input } from '@angular/core';

@Component({
  selector: '[lcdj-image]',
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  reference = input.required<string | undefined | null>();
  texte = input<string | undefined | null>(undefined);
  noCache = input<boolean>(false);

  @HostBinding('src') get source() {
    return this.getProductImage();
  }

  @HostBinding('class') get classe() {
    return 'img-border';
  }

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
