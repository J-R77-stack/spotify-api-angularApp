import { Component } from '@angular/core';
import { SpotifyAuthService } from '../spotify-auth.service';

@Component({
  selector: 'app-artistplaylist',
  templateUrl: './artistplaylist.component.html',
  styleUrl: './artistplaylist.component.css',
})
export class ArtistplaylistComponent {
  playlistItems: any[] = [];
  playlistId = '6IgN81Bb7XbnPcTSPkXG8F'; // Replace with Tim Green's artist ID

  constructor(private spotifyAuth: SpotifyAuthService) {}

  ngOnInit(): void {
    this.spotifyAuth.getAccessToken().subscribe((token) => {
      if (token) {
        this.spotifyAuth
          .fetchArtistPlaylists(this.playlistId)
          .subscribe((data: any) => {
            this.playlistItems = data.items;
          });
      }
    });
  }
}
