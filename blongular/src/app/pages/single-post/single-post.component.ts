import { Component } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { CommentFormComponent } from '../../comments/comment-form/comment-form.component';
import { CommentListComponent } from '../../comments/comment-list/comment-list.component';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../model/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [PostCardComponent, CommentFormComponent, CommentListComponent, CommonModule],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent {
  postData!: Post;
  similarPostsArray: Array<Post> = [];

  constructor(private route: ActivatedRoute, private postService: PostsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postService.loadOne(params['id']).subscribe((data) => {
        this.postData = data;
        this.loadSimilarPosts(this.postData.category.categoryId);
      });

      this.postService.countViews(params['id']);
    });
  }

  convertTimestampToDate(timestamp: any): string | number | Date {
		return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
	}

  loadSimilarPosts(categoryId: string): void {
    this.postService.loadSimilar(categoryId).subscribe((data) => {
      this.similarPostsArray = data;
    });
  }
}
