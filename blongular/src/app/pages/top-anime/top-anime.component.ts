import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-anime',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-anime.component.html',
  styleUrl: './top-anime.component.css'
})
export class TopAnimeComponent {
  topAnimes: any[] = [];

  constructor(private animeService: AnimeService) { }

  ngOnInit(): void {
    this.animeService.getSeasonalAnimes().subscribe((data: any) => {
      this.topAnimes = data.data;
    });
  }
}
