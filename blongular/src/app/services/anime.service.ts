import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private apiUrl = 'https://api.jikan.moe/v4';

  private http: HttpClient = inject(HttpClient);

  constructor() { }

  getTopAnimes(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/top/anime');
  }

  getSeasonalAnimes(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/seasons/now');
  }
}
