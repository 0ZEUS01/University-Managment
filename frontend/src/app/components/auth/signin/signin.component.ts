import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Redirect if already logged in
    if (this.authService.currentUserValue) {
      this.navigateBasedOnRole();
      return;
    }

    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    // Stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.signin(this.signinForm.value)
      .subscribe(
        response => {
          this.loading = false;
          this.navigateBasedOnRole();
        },
        error => {
          this.error = 'Invalid username or password';
          this.loading = false;
        }
      );
  }

  navigateBasedOnRole() {
    const role = this.authService.getUserRole();
    
    switch(role) {
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

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
