import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './../environments/environment.prod'; // Import environment config
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat'; // Use compat if you are using older AngularFire
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Use compat if you are using older AngularFire
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations'; // Required for Toastr
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { FormsModule } from '@angular/forms';
import { IndividualConfig, ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CategoriesComponent, // Add CategoriesComponent to imports
    AppComponent, // Add AppComponent to imports
    // Add AngularFireModule and AngularFirestoreModule to imports
    AngularFireModule.initializeApp(environment.firebaseConfig), // Initialize Firebase with config
    AngularFirestoreModule, // Import Firestore module
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    provideAnimations(), // required animations providers
    provideToastr(),
  ],
})
export class AppModule { }
