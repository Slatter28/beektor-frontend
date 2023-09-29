import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { LayoutService } from '../../services/layout.service';
// import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ConfirmationService],
})
export class HeaderComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;
  cssUrl!: string;
  constructor(
    public layoutService: LayoutService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private router: Router,
    public sanitizer: DomSanitizer
  ) {
    // this.saveTheme();
    this.cssUrl = '/assets/css/themeLight.css';
  }

  logout() {
    this.confirmationService.confirm({
      key: 'confirml1',
      message: 'Está seguro de cerrar la sesión?',
      header: 'Confirmación',
      accept: () => {
        this.authService.signOut();
        this.router.navigate(['/auth']);
      },
      acceptLabel: 'Si',
    });
  }
  changeStyle() {
    this.cssUrl =
      this.cssUrl === `/assets/css/theme.css`
        ? `/assets/css/themeLight.css`
        : `/assets/css/theme.css`;
  }

  saveTheme() {
    if (!localStorage.getItem('theme')) {
      console.log('no existe');
      localStorage.setItem('theme', 'light');
      this.cssUrl = `/assets/css/themeLight.css`;
    } else {
      if (localStorage.getItem('theme') == 'dark') {
        localStorage.setItem('theme', 'dark');
        this.cssUrl = `/assets/css/theme.css`;
      } else {
        localStorage.setItem('theme', 'light');
        this.cssUrl = `/assets/css/themeLight.css`;
      }
    }
  }
}
