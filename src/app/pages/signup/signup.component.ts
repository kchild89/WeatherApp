import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  email = '';
  password = '';

  onSignupEmail() {
    this.authService
      .signupWithEmail(this.email, this.password)
      .then(() => {
        console.log('sign up successful');
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.error('sign up failed', error);
      });
  }
  onSignupGoogle() {
    this.authService
      .signupWithGoogle()
      .then(() => {
        console.log('sign up successful');
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.error('sign up failed', error);
      });
  }
}
