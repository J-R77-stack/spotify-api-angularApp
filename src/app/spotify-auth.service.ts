// src/app/spotify-auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { sha256 } from 'js-sha256';
import { encode as base64encode } from 'base64-arraybuffer';

@Injectable({
  providedIn: 'root',
})
export class SpotifyAuthService {
  private clientId = '7a31dab292244ff9ac0a830ba5142c6f';
  private redirectUri = 'http://localhost:4200/callback';
  private authUrl = 'https://accounts.spotify.com/authorize';
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private accessToken = new BehaviorSubject<string | null>(null);
  private codeVerifierKey = 'spotify_code_verifier';

  constructor(private http: HttpClient, private router: Router) {}

  private generateCodeVerifier(length: number): string {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let text = '';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private generateCodeChallenge(verifier: string): string {
    return base64encode(sha256.arrayBuffer(verifier))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  getAccessToken(): Observable<string | null> {
    return this.accessToken.asObservable();
  }

  authorize() {
    const codeVerifier = this.generateCodeVerifier(128);
    localStorage.setItem(this.codeVerifierKey, codeVerifier);
    const codeChallenge = this.generateCodeChallenge(codeVerifier);
    const params = new HttpParams({
      fromObject: {
        client_id: this.clientId,
        response_type: 'code',
        redirect_uri: this.redirectUri,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        scope: 'user-read-private user-read-email',
      },
    });
    window.location.href = `${this.authUrl}?${params.toString()}`;
  }

  fetchAccessToken(code: string) {
    const codeVerifier = localStorage.getItem(this.codeVerifierKey);
    if (!codeVerifier) {
      console.error('Code verifier is missing');
      return;
    }
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('client_id', this.clientId)
      .set('code_verifier', codeVerifier);

    this.http
      .post(this.tokenUrl, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .subscribe((response: any) => {
        this.accessToken.next(response.access_token);
        this.router.navigate(['/']);
      });
  }

  fetchArtistTopTracks(artistId: string): Observable<any> {
    const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks`;
    const params = new HttpParams().set('market', 'US');
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken.getValue()}`,
      },
      params,
    });
  }
  // fetchArtistPlaylist(artistId: string): Observable<any> {
  //   const url = `https://api.spotify.com/v1/playlist/${artistId}`;
  //   const params = new HttpParams().set('market', 'US');
  //   return this.http.get(url, {
  //     headers: {
  //       Authorization: `Bearer ${this.accessToken.getValue()}`,
  //     },
  //     params,
  //   });
  // }
  fetchArtistPlaylists(playlistId: string): Observable<any> {
    const url = `
    https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const params = new HttpParams().set('market', 'ES');
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken.getValue()}`,
      },
      params,
    });
  }
}
