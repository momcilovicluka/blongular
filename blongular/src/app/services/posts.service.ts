import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, increment, limit, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
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

  loadData(): Observable<any[]> {
		return collectionData(collection(this.firestore, 'posts'), { idField: 'id' });
	}

  loadFeatured(): Observable<any[]> {
		const postsCollection = collection(this.firestore, 'posts');
    const featuredPostsQuery = query(postsCollection, where('isFeatured', '==', true), limit(4));
    return collectionData(featuredPostsQuery, { idField: 'id' });
	}

  loadAllOrderedByDate(): Observable<any[]> {
    const postsCollection = collection(this.firestore, 'posts');
    const orderedPostsQuery = query(
      postsCollection,
      orderBy('createdAt', 'desc'),
      limit(100)
    );
    return collectionData(orderedPostsQuery, { idField: 'id' });
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

  loadCategoryPosts(categoryId: string): Observable<any[]> {
		const postsCollection = collection(this.firestore, 'posts');
    const featuredPostsQuery = query(postsCollection, where('category.categoryId', '==', categoryId));
    return collectionData(featuredPostsQuery, { idField: 'id' });
	}

  loadSimilar(categoryId: string): Observable<any[]> {
		const postsCollection = collection(this.firestore, 'posts');
    const featuredPostsQuery = query(postsCollection, where('category.categoryId', '==', categoryId), limit(4));
    return collectionData(featuredPostsQuery, { idField: 'id' });
	}

  countViews(id: string): void {
    const docRef = doc(this.firestore, 'posts', id);
    updateDoc(docRef, { views: increment(1) });
  }

}
