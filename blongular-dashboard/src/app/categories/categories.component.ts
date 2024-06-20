import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../services/categories.service';
import { Category } from './../models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {

  categoryArray: Array<Category> = [];
  formCategory: string = '';
  formStatus: string = 'Add';
  categoryId: string | undefined = '';

  constructor(private categoriesService: CategoriesService, private toastr: ToastrService) { }

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
      this.toastr.success('Category ' + categoryData.category + ' added successfully!');
    } else if (this.formStatus === 'Edit') {
      await this.categoriesService.updateData(categoryData, this.categoryId);
      this.formStatus = 'Add';
      this.toastr.success('Category ' + categoryData.category + ' updated successfully!');
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