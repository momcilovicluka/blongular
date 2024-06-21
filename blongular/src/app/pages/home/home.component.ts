import { Component } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../model/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private postService: PostsService) { }

  featuredPostsArray: Array<Post> = [];
  latestPostsArray: Array<Post> = [];

  ngOnInit(): void {
		this.postService.loadFeatured().subscribe((data) => {
			this.featuredPostsArray = data;
		});
    
    this.postService.loadAllOrderedByDate().subscribe((data) => {
      this.latestPostsArray = data;
    });
	}
}
