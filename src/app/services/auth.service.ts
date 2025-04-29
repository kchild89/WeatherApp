import {
  EnvironmentInjector,
  Injectable,
  runInInjectionContext,
} from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  UserCredential,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private router: Router,
    private injector: EnvironmentInjector
  ) {}

  loginWithEmail(email: string, password: string): Promise<UserCredential> {
    return runInInjectionContext(this.injector, async () => {
      return signInWithEmailAndPassword(this.auth, email, password);
    });
  }
  loginWithGoogle(): Promise<UserCredential> {
    return runInInjectionContext(this.injector, async () => {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(this.auth, provider);
    });
  }
  signupWithEmail(email: string, password: string): Promise<UserCredential> {
    return runInInjectionContext(this.injector, async () => {
      return createUserWithEmailAndPassword(this.auth, email, password);
    });
  }
  signupWithGoogle(): Promise<UserCredential> {
    return runInInjectionContext(this.injector, async () => {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(this.auth, provider);
    });
  }
  logout(): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      return signOut(this.auth);
    });
  }
}
