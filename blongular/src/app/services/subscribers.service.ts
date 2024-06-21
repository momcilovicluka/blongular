import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  firestore: Firestore = inject(Firestore);
	categoriesCollection: any;

	constructor() {
		this.categoriesCollection = collection(this.firestore, 'subscribers');
	}

	saveData(data: any) {
		let ref;
		try {
			ref = addDoc(this.categoriesCollection, data);
			console.log('Document successfully written!', data);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
		return ref;
	}

  checkSubs(email: string) {
      const postsCollection = collection(this.firestore, 'subscribers');
      const featuredPostsQuery = query(postsCollection, where('email', '==', email));
      return collectionData(featuredPostsQuery, { idField: 'id' });
    
  }
}
