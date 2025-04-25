import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {
    console.log('✅ LoginComponent loaded');
  }

  onLoginEmail() {
    this.authService
      .loginWithEmail(this.email, this.password)
      .then(() => {
        console.log('Login successful');
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
  }

  onLoginGoogle() {
    this.authService
      .loginWithGoogle()
      .then(() => {
        console.log('Login successful');
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
  }
}
