import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './posts/all-post/all-post.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'all-posts', component: AllPostComponent}
];
