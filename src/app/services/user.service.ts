import {
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
} from '@angular/core';
import {
  collection,
  CollectionReference,
  doc,
  DocumentSnapshot,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { UserSettings } from '../interfaces/user-settings';
import { Auth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);

  constructor() {}

  getUserSettings(): Observable<DocumentSnapshot | null> {
    return runInInjectionContext(this.injector, () => {
      const user = this.auth.currentUser;
      if (user) {
        try {
          const settingsRef = doc(
            this.firestore,
            `users/${user.uid}/settings/data`
          );
          return from(getDoc(settingsRef));
        } catch (error) {
          console.error('error while getting user settings: ', error);
        }
      }
      return from([null]);
    });
  }

  updateUserSettings(settings: UserSettings) {
    return runInInjectionContext(this.injector, () => {
      const user = this.auth.currentUser;
      if (user && settings) {
        try {
          const settingsRef = doc(
            this.firestore,
            `users/${user.uid}/settings/data`
          );
          setDoc(settingsRef, settings);
        } catch (error) {
          console.error('error updating user settings: ', error);
        }
      } else {
        console.error('invalid user');
      }
    });
  }
}
