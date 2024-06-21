import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, DocumentReference, DocumentData } from '@angular/fire/firestore';
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

  deleteData(id: string | undefined) {
	const docRef: DocumentReference<unknown, DocumentData> = doc(this.categoriesCollection, id);
		try {
			deleteDoc(docRef);
			console.log('Document successfully deleted!');
		} catch (e) {
			console.error('Error deleting document: ', e);
		}
	}
}
