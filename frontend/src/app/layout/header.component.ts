import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <button (click)="menuToggled.emit(true)" mat-icon-button>
        <mat-icon>menu</mat-icon>
      </button>
      <a routerLink="/" class="logo-link">
        <img src="assets/logo1.png" alt="EMSI Logo" class="logo">
      </a>
      <span class="spacer"></span>
      <span class="welcome-text">Hello {{ user }}</span>
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>person_pin</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="logout()">
          <span>Logout</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [
    `
      :host {
        display: block;
        background-color: #D0DDD0;
      }

      .mat-toolbar {
        background-color: #D0DDD0;
        color: #333;
        padding-top: 10px;
        padding-bottom: 10px;
      }

      .spacer {
        flex: 1 1 auto;
      }

      .logo-link {
        display: flex;
        align-items: center;
        text-decoration: none;
      }

      .welcome-text {
        font-size: smaller;
        color: #333;
      }

      .logo {
        height: 50px;
        width: auto;
        margin-right: 10px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() menuToggled = new EventEmitter<boolean>();

  user: string = 'Enea';

  logout() {
    // Implement logout logic
  }
}
