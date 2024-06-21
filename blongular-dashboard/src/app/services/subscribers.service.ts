import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
	firestore: Firestore = inject(Firestore);
	categories$: Observable<any[]>;
	categoriesCollection: any;

	constructor() {
		this.categoriesCollection = collection(this.firestore, 'subscribers');
		this.categories$ = collectionData(this.categoriesCollection);
	}

	loadData(): Observable<any[]> {
		return collectionData(this.categoriesCollection, { idField: 'id' });
	}
}
