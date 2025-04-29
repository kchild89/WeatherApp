import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
  isLoggedIn = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = !!user;
      this.cdr.detectChanges(); // 👈 Force Angular to re-render with updated value
    });
  }

  logout() {
    signOut(this.auth).then(() => this.router.navigate(['/login']));
  }
}
