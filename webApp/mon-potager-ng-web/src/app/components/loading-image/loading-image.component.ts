import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  inject,
  Inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { LoadingImageService } from '../../services';
import { TypingModel } from './typing.model';
import { ReferencePhoto } from './reference-photo.model';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'lcdj-loading-image',
  imports: [ButtonModule, ProgressBarModule],
  templateUrl: './loading-image.component.html',
  styleUrl: './loading-image.component.scss',
  host: { class: 'img-border' },
})
export class LoadingImageComponent {
  @Input('referenceInitiale')
  referenceDeLimage: string | undefined;

  @Input('Id')
  Id?: string;

  sanitizer = inject(DomSanitizer);

  @Output('referenceModifiee')
  public clickEmitter: EventEmitter<TypingModel> =
    new EventEmitter<TypingModel>();

  chargementEnCours = signal<boolean>(false);
  progressionDuChargement: number = 0;

  public get contenuDeLimage(): SafeStyle {
    return this.referenceDeLimage
      ? this.sanitizer.bypassSecurityTrustResourceUrl(
          `${this.imageUrl}${this.referenceDeLimage}.jpg?timespan=${new Date().getTime()}`,
        )
      : this.sanitizer.bypassSecurityTrustResourceUrl('assets/silhouette.jpg');
  }

  souscriptionDeChargement!: Subscription;

  constructor(
    @Inject('IMG_API_URL') public imageUrl: string,
    public loadingService: LoadingImageService,
  ) {}

  supprimerImage() {
    this.referenceDeLimage = undefined;
  }

  envoiFichier(event: Event): boolean {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.chargementEnCours.set(true);

    this.souscriptionDeChargement = this.loadingService
      .loadingFile(file, this.referenceDeLimage as string)
      .subscribe({
        next: (event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.progressionDuChargement = Math.round(
              100 * (event.loaded / event.total!),
            );
          }
          if (event.type == HttpEventType.Response) {
            const results = event.body as ReferencePhoto;
            this.progressionDuChargement = 0;
            this.referenceDeLimage = results.reference;

            this.clickEmitter.emit({
              id: this.Id,
              value: this.referenceDeLimage,
              isLoading: this.chargementEnCours,
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          this.chargementEnCours.set(false);

          if (this.souscriptionDeChargement)
            this.souscriptionDeChargement.unsubscribe();
        },
        complete: () => {
          this.chargementEnCours.set(false);
          if (this.souscriptionDeChargement)
            this.souscriptionDeChargement.unsubscribe();
          return true;
        },
      });
    return false;
  }
}
