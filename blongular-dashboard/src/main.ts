import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment.prod';

import { DashboardComponent } from './app/dashboard/dashboard.component';
import { CategoriesComponent } from './app/categories/categories.component';
import { ToastrService } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: DashboardComponent }, // Default route
      { path: 'dashboard', component: DashboardComponent },
      {path: 'categories', component: CategoriesComponent},
      { path: '**', redirectTo: '' } // Wildcard route for handling 404s
    ]), provideFirebaseApp(() => initializeApp({"projectId":"blongular","appId":"1:443405265976:web:f2bf85ca5a028e6ab84acd","storageBucket":"blongular.appspot.com","apiKey":"AIzaSyDJWVLwOxnlwFOuuXRaleJ0m3pGeomFMkg","authDomain":"blongular.firebaseapp.com","messagingSenderId":"443405265976","measurementId":"G-NDJ23T300P"})), provideFirestore(() => getFirestore()),
    { provide: ToastrService, useValue: ToastrService }
  ],
}).catch(err => console.error(err));
