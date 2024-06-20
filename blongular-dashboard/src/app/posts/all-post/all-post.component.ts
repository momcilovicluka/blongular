import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';

@Component({
  selector: 'app-all-post',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent {
convertTimestampToDate(timestamp: any): string|number|Date {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
}

  postArray: Array<Post> = [];

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.loadData().subscribe((data) => {
      console.log(data);
      this.postArray = data;
      console.log('Post Array:', this.postArray);
    });
  }
}
