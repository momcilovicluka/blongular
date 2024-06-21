import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Sub } from '../model/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.css'
})
export class SubscriptionFormComponent {
  isEmailError: boolean = false;
  isSubscribed: boolean = false;

  constructor(private subscribersService: SubscribersService) {}

ngOnInit(): void {
  this.isEmailError = false;
  this.isSubscribed = false;
}

  onSubmit(formValue: any) {
    const subData: Sub = {
      name: formValue.name,
      email: formValue.email
    };

    this.isSubscribed = false;

    this.subscribersService.checkSubs(subData.email).subscribe((data) => {
      if (data.length === 0) {
        this.subscribersService.saveData(subData);
        this.isEmailError = false;
        this.isSubscribed = true;
      } else {
        this.isEmailError = true;
      }
    });
  }
}
