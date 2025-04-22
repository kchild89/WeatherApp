import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}
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
