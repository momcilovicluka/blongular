import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../services/categories.service';
import { Category } from './../models/category';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {

  categoryArray: Array<Category> = [];
  formCategory: string = '';
  formStatus: string = 'Add';
  categoryId: string | undefined = '';

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.loadData().subscribe(data => {
      this.categoryArray = data;
    });
  }

  async onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category,
    };

    formData.reset();

    if (this.formStatus === 'Add') {
      await this.categoriesService.saveData(categoryData);
    } else if (this.formStatus === 'Edit') {
      await this.categoriesService.updateData(categoryData, this.categoryId);
      this.formStatus = 'Add';
    }
  }

  onEdit(category: any, id: string | undefined) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: string | undefined) {
    this.categoriesService.deleteData(id);
  }
}