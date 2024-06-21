import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {

  @Input() postData: any;

  ngOnInit(): void {
    console.log(this.postData);
  }
}
