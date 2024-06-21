import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HeaderComponent } from '../../layouts/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private router = inject(Router);

  constructor(private authService: AuthService) { }

  async onSubmit(formValue: any) {
    await this.authService.login(formValue.email, formValue.password);
  }
}
