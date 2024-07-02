// src/app/app.component.ts
import { Component } from '@angular/core';
import { SpotifyAuthService } from './spotify-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private spotifyAuth: SpotifyAuthService) {}

  authorize() {
    this.spotifyAuth.authorize();
  }
}
