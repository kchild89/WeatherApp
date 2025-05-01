import { Component, inject, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UserSettings } from '../../interfaces/user-settings';
import { Observable } from 'rxjs';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  user: User | null = null;
  userSettings$:
    | Observable<DocumentSnapshot<DocumentData, DocumentData> | null>
    | undefined;
  form = new FormGroup({
    units: new FormControl('imperial'),
  });

  ngOnInit(): void {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.userSettings$ = this.userService.getUserSettings();
        this.userSettings$.subscribe((settings) => {
          let data = settings?.data();
          if (data === undefined) {
            // user's settings don't exist, create default settings
            const defaultSettings = {
              units: 'metric',
            };
            data = defaultSettings;
            this.userService.updateUserSettings(defaultSettings);
          }
          this.form.get('units')?.setValue(data['units']);
        });
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

  updateSettings() {
    const updatedSettings = {
      units: this.form.get('units')?.value,
    };
    if (
      updatedSettings &&
      updatedSettings.units &&
      (updatedSettings.units === 'metric' ||
        updatedSettings.units === 'imperial')
    ) {
      this.userService.updateUserSettings(updatedSettings as UserSettings);
    } else {
      console.error('invalid input');
    }
  }
}
