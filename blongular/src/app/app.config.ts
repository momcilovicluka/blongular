import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideFirebaseApp(() => initializeApp({"projectId":"blongular","appId":"1:443405265976:web:f2bf85ca5a028e6ab84acd","storageBucket":"blongular.appspot.com","apiKey":"AIzaSyDJWVLwOxnlwFOuuXRaleJ0m3pGeomFMkg","authDomain":"blongular.firebaseapp.com","messagingSenderId":"443405265976","measurementId":"G-NDJ23T300P"})), provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ]
};
