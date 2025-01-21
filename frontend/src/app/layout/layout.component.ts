import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Menu } from './menu.model';

@Component({
  selector: 'app-layout',
  template: `
    <div>
      <app-header (menuToggled)="toggle()"></app-header>

      <mat-drawer-container>
        <mat-drawer mode="side" [opened]="opened">
          <app-menu-item [menu]="menu"></app-menu-item>
        </mat-drawer>

        <mat-drawer-content [class.margin-left]="opened">
          <router-outlet></router-outlet>
        </mat-drawer-content>
      </mat-drawer-container>
    </div>
  `,
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  opened = true;

  toggle(): void {
    this.opened = !this.opened;
  }

  menu: Menu = [
    {
      title: 'Home',
      icon: 'home',
      link: '/home',
      color: '#727D73'
    },
    {
      title: 'Dashboard',
      icon: 'dashboard',
      color: '#727D73',
      subMenu: [
        {
          title: 'Students',
          icon: 'people',
          link: '/students',
          color: '#727D73'
        },
        {
          title: 'Courses',
          icon: 'book',
          link: '/courses',
          color: '#727D73'
        },
        {
          title: 'Exams',
          icon: 'assignment',
          link: '/exams',
          color: '#727D73'
        }
      ]
    }
  ];
}
