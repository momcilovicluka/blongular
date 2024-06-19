import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class CategoriesService {

	firestore: Firestore = inject(Firestore);
	categories$: Observable<any[]>;
	categoriesCollection: any;

	constructor(private toastr: ToastrService) {
		this.categoriesCollection = collection(this.firestore, 'categories');
		this.categories$ = collectionData(this.categoriesCollection);
	}

	saveData(data: any) {
		let ref;
		try {
			ref = addDoc(this.categoriesCollection, data);
			console.log('Document successfully written!', data);
			this.toastr.success('Category ' + data.category + ' added successfully!');
		} catch (e) {
			console.error('Error adding document: ', e);
		}
		return ref;
	}

	loadData(): Observable<any[]> {
		return collectionData(this.categoriesCollection, { idField: 'id' });
	}

	async updateData(editData: any, id: string | undefined) {
		console.log("editData: ", editData);
		console.log("id: ", id);
		const categoryDocRef = doc(this.firestore, `categories/${id}`);
		try {
			await updateDoc(categoryDocRef, editData);
			console.log('Document successfully updated!', editData);
			this.toastr.success('Category successfully updated!');
		} catch (e) {
			console.error('Error updating document: ', e);
		}
	}

	async deleteData(id: string | undefined) {
		const categoryDocRef = doc(this.firestore, `categories/${id}`);
		try {
			await deleteDoc(categoryDocRef);
			console.log('Document successfully deleted!');
			this.toastr.success('Category successfully deleted!');
		} catch (e) {
			console.error('Error deleting document: ', e);
		}
	}
}
