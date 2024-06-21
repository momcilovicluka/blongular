import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userEmail: string = '';

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user !== null) {
      this.userEmail = JSON.parse(user).email;
    } else {
      this.userEmail = '';
    }
  }
}
