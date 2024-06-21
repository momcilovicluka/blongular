import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class CategoriesService {

	firestore: Firestore = inject(Firestore);
	categories$: Observable<any[]>;
	categoriesCollection: any;

	constructor() {
		this.categoriesCollection = collection(this.firestore, 'categories');
		this.categories$ = collectionData(this.categoriesCollection);
	}

	loadData(): Observable<any[]> {
		return collectionData(this.categoriesCollection, { idField: 'id' });
	}
}
