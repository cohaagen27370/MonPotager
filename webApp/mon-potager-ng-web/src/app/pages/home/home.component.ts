import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { globalStore } from '../../core/global.store';

@Component({
  selector: 'lcdj-home',
  imports: [ButtonModule, RouterModule, ImageModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: {
    class: 'w-screen flex align-items-center justify-content-center',
  },
})
export class HomeComponent {
  globalStore = inject(globalStore);
  navigation = inject(Router);

  navigateToSignup() {
    this.navigation.navigate(['home', 'signup']);
  }

  navigateToLogin() {
    this.globalStore.selectMenu('messages');
    this.navigation.navigate(['home', 'login']);
  }
}
