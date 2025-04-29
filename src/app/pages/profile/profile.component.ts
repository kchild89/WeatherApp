import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  ngOnInit(): void {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log('User loaded:', user);
      } else {
        this.user = null;
      }
    });
  }

  logout(): void {
    getAuth()
      .signOut()
      .then(() => {
        window.location.href = '/login';
      });
  }
}
