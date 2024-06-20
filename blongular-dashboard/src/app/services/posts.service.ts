import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, deleteObject, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private firestore: Firestore = inject(Firestore);
  private readonly storage: Storage = inject(Storage);
  private router = inject(Router);

  constructor() { }

  uploadImage(selectedImage: any, postData: any, formStatus: any, id:string) {
    const filePath = `postIMG/${Date.now()}`;

    console.log("postData", postData);
    console.log("id", id);
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    uploadTask.on('state_changed', 
      (snapshot) => {
      }, 
      (error) => {
        console.error('Upload failed:', error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          postData.postImgPath = downloadURL;

          if(formStatus === 'Edit') {
            this.updateData(postData, id);
          } else {
          const docRef = addDoc(collection(this.firestore, 'posts'), postData);
          console.log('Document written');}
        });
      }
    );

    this.router.navigate(['/posts']);
  }

  loadData(): Observable<any[]> {
		return collectionData(collection(this.firestore, 'posts'), { idField: 'id' });
	}

  loadOne(id: string): Observable<any> {
    const docRef = doc(this.firestore, 'posts', id);
    return from(getDoc(docRef)).pipe(
      map(docSnapshot => {
        if (docSnapshot.exists()) {
          return { id: docSnapshot.id, ...docSnapshot.data() };
        } else {
          return null;
        }
      })
    );
  }

  updateData(editData: any, id: string | undefined) {
		const categoryDocRef = doc(this.firestore, `posts/${id}`);
		try {
			updateDoc(categoryDocRef, editData);
      this.router.navigate(['/posts']);
		} catch (e) {
			console.error('Error updating document: ', e);
		}
	}

  markFeatured(id: string, featured: boolean): void {
    const docRef = doc(this.firestore, `posts/${id}`);
    updateDoc(docRef, { isFeatured: featured }).then(() => {
      console.log('Document successfully updated!');
    }).catch((error) => {
      console.error('Error updating document: ', error);
    });
  }

  deletePost(id: string, imagePath: string): Promise<void> {
    const imageRef = ref(this.storage, imagePath);
    const docRef = doc(this.firestore, 'posts', id);

    // Delete the image from storage
    return deleteObject(imageRef).then(() => {
      // After the image is deleted, delete the document from Firestore
      return deleteDoc(docRef).then(() => {
        console.log('Document successfully deleted!');
      });
    }).catch((error) => {
      console.error('Error deleting document or image: ', error);
      throw error;
    });
  }
}
