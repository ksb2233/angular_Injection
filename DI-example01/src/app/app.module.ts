import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeroListComponent } from './heroes/hero-list.component';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { Logger } from './logger.service';
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    Logger
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
