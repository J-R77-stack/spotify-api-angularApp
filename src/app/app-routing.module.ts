// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { TopTracksComponent } from './top-tracks/top-tracks.component';

const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'top-tracks', component: TopTracksComponent },
  { path: '**', redirectTo: 'callback' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
