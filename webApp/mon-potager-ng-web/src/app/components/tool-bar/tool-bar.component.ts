import { Component, inject, output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ReactiveFormsModule } from '@angular/forms';
import { globalStore } from '../../core/global.store';
import { ConfirmationService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
  selector: 'app-tool-bar',
  imports: [
    ToolbarModule,
    ButtonModule,
    AvatarModule,
    RouterModule,
    OverlayPanelModule,
    InputTextModule,
    ReactiveFormsModule,
    ConfirmPopupModule,
    MessageModule,
    IftaLabelModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss',
})
export class ToolBarComponent {
  confirmationService = inject(ConfirmationService);

  globalStore = inject(globalStore);
  router = inject(Router);

  onShowMisc = output();

  showMisc() {
    this.onShowMisc.emit();
  }

  logout(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Voulez-vous vous déconnecter ?',
      icon: 'pi pi-exclamation-circle',
      rejectLabel: 'Non',
      rejectIcon: 'pi pi-times',
      rejectVisible: true,
      acceptIcon: 'pi pi-check',
      acceptLabel: 'Oui',
      accept: () => {
        this.globalStore.setToken('', 0);
        this.router.navigate(['home','welcome']);
      },
      reject: () => {},
    });
  }
}
