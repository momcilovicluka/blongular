import { Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../model/category';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-navbar.component.html',
  styleUrl: './category-navbar.component.css'
})
export class CategoryNavbarComponent {
  categoryArray: Array<Category> = [];

  constructor(private categoriesService: CategoriesService) {
    this.categoriesService.loadData().subscribe(data => {
      this.categoryArray = data;
    });
  }
}
