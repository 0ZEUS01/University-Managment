import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AuthCredentials } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  error = '';
  roles = ['STUDENT', 'TEACHER'];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['STUDENT', Validators.required]
    });
  }

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.navigateBasedOnRole();
    }
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const credentials: AuthCredentials = {
      username: this.signupForm.get('username')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
      role: this.signupForm.get('role')?.value
    };

    this.authService.signup(credentials).subscribe({
      next: (response) => {
        this.loading = false;
        this.navigateBasedOnRole();
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.message || 'Signup failed';
      }
    });
  }

  navigateToSignin() {
    this.router.navigate(['/signin']);
  }

  private navigateBasedOnRole() {
    const role = this.authService.getUserRole();
    switch (role) {
      case 'STUDENT':
        this.router.navigate(['/student/home']);
        break;
      case 'TEACHER':
        this.router.navigate(['/teacher/home']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}
