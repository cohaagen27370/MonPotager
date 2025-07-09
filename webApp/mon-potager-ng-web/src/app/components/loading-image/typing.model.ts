import { signal } from '@angular/core';
export class TypingModel {
  public id?: string;
  public value?: string | boolean | number | null;
  public isLoading = signal<boolean>(false);
}
