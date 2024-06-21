import { Component } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.css'
})
export class SubscribersComponent {

  subscribersArray: any[] = [];

  constructor(private subscribersService: SubscribersService) {
  }

  ngOnInit(): void {
    this.subscribersService.loadData().subscribe(data => {
      this.subscribersArray = data;
    });
  }
}
