// src/app/top-tracks/top-tracks.component.ts
import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from '../spotify-auth.service';

@Component({
  selector: 'app-top-tracks',
  templateUrl: './top-tracks.component.html',
  styleUrls: ['./top-tracks.component.css'],
})
export class TopTracksComponent implements OnInit {
  topTracks: any[] = [];
  artistId = '68vO4fkFxLbWPxTSHosxsB'; // Replace with the desired artist's ID

  constructor(private spotifyAuth: SpotifyAuthService) {}

  ngOnInit(): void {
    this.spotifyAuth.getAccessToken().subscribe((token) => {
      if (token) {
        this.spotifyAuth
          .fetchArtistTopTracks(this.artistId)
          .subscribe((data: any) => {
            this.topTracks = data.tracks;
          });
      }
    });
  }
}
