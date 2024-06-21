import { Injectable, inject } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  private router = inject(Router);

  constructor() { }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User logged in: ', userCredential.user);
      this.loadUser();
      this.router.navigate(['']);
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  }

  loadUser() {
    authState(this.auth).subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }
}
