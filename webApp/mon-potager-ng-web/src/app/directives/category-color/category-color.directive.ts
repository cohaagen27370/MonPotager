import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[categoryColor]',
})
export class CategoryColorDirective {
  @Input('category')
  set category(categoryId: number | undefined | null) {
    switch (categoryId) {
      case 1:
        this.renderer.addClass(this.eleRef.nativeElement, 'vegetables');
        break;
      case 2:
        this.renderer.addClass(this.eleRef.nativeElement, 'fruits');
        break;
      case 3:
        this.renderer.addClass(this.eleRef.nativeElement, 'preparations');
        break;
    }
  }

  constructor(
    public renderer: Renderer2,
    public eleRef: ElementRef,
  ) {}
}
