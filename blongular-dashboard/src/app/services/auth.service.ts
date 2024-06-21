import { Injectable, inject } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  private router = inject(Router);

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  login(email: string, password: string) {
    try {
      signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
        console.log('User logged in: ', userCredential.user);
        this.loadUser();
        this.loggedIn.next(true);
        this.router.navigate(['/dashboard']);
      });
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  }

  loadUser() {
    authState(this.auth).subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  logOut() {
    this.auth.signOut();
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }

  isLoggedIn() {
    if (localStorage.getItem('user'))
      this.loggedIn.next(true);
    return this.loggedIn.asObservable();
  }
}
