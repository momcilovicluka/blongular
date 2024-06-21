import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment.prod';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { CategoriesComponent } from './app/categories/categories.component';
import { AllPostComponent } from './app/posts/all-post/all-post.component';
import { NewPostComponent } from './app/posts/new-post/new-post.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoginComponent } from './app/auth/login/login.component';
import { authGuard } from './app/services/auth.guard';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: DashboardComponent, canActivate: [authGuard] }, // Default route
      { path: 'login', component: LoginComponent},
      { path: 'dashboard', component: DashboardComponent , canActivate: [authGuard] },
      { path: 'categories', component: CategoriesComponent, canActivate: [authGuard] },
      { path: 'posts', component: AllPostComponent, canActivate: [authGuard] },
      { path: 'posts/new', component: NewPostComponent, canActivate: [authGuard] },
      { path: '**', redirectTo: '' } // Wildcard route for handling 404s
    ]), provideFirebaseApp(() => initializeApp({"projectId":"blongular","appId":"1:443405265976:web:f2bf85ca5a028e6ab84acd","storageBucket":"blongular.appspot.com","apiKey":"AIzaSyDJWVLwOxnlwFOuuXRaleJ0m3pGeomFMkg","authDomain":"blongular.firebaseapp.com","messagingSenderId":"443405265976","measurementId":"G-NDJ23T300P"})), provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
  ],
}).catch(err => console.error(err));
