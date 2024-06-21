import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userEmail: string = '';

  router = inject(Router);

  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {
      // detect route changes
      this.router.events.subscribe(() => {
        this.ngOnInit();
      });
   }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    
    const user = localStorage.getItem('user');
    if (user !== null) {
      this.userEmail = JSON.parse(user).email;
    } else {
      this.userEmail = '';
    }
    
  }

  onLogOut() {
    this.authService.logOut();
    this.ngOnInit();
  }
}
