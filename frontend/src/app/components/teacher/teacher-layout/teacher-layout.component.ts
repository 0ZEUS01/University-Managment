import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-teacher-layout',
  templateUrl: './teacher-layout.component.html',
  styleUrls: ['./teacher-layout.component.css']
})
export class TeacherLayoutComponent implements OnInit {
  username: string = '';
  fullName: string = '';

  constructor(
    public router: Router, 
    private authService: AuthService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.username = currentUser.username;
      this.fullName = this.formatUsername(this.username);
    }
  }

  // Helper method to format username into a more readable full name
  private formatUsername(username: string): string {
    return username
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .trim();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
