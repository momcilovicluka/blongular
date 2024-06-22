import { Component } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../model/post';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TopAnimeComponent } from '../top-anime/top-anime.component';

@Component({
  selector: 'app-single-category',
  standalone: true,
  imports: [PostCardComponent, CommonModule, HttpClientModule, TopAnimeComponent],
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css'
})
export class SingleCategoryComponent {
  constructor(private route: ActivatedRoute, private postService: PostsService) { }

  PostsArray: Array<Post> = [];
  categoryObject: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryObject = params;

      this.postService.loadCategoryPosts(params['id']).subscribe((data) => {
        this.PostsArray = data;
      });
  });
  }
}
