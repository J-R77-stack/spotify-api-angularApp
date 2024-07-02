// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { TopTracksComponent } from './top-tracks/top-tracks.component';
import { ArtistplaylistComponent } from './artistplaylist/artistplaylist.component';

@NgModule({
  declarations: [AppComponent, CallbackComponent, TopTracksComponent, ArtistplaylistComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
