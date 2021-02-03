import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy,
         HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeroData } from './core/data/hero-data';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';


import { AppComponent } from './app.component';
import { HeroBioComponent } from './shared/layout/hero-bio.component';
import { HeroBiosComponent,
         HeroBiosAndContactsComponent } from './shared/layout/hero-bios.component';
import { HeroOfTheMonthComponent } from './shared/layout/hero-of-the-month.component';
import { HeroContactComponent } from './shared/layout/hero-contact.component';
import { HeroesBaseComponent,
         SortedHeroesComponent } from './shared/layout/sorted-heroes.component';
import { HighlightDirective } from './shared/highlight.directive';
import { ParentFinderComponent,
         AlexComponent,
         AliceComponent,
         CarolComponent,
         ChrisComponent,
         CraigComponent,
         CathyComponent,
         BarryComponent,
         BethComponent,
         BobComponent } from './shared/layout/parent-finder.component';
import { StorageComponent } from './shared/layout/storage.component';

const declarations = [
    AppComponent,
    HeroBiosComponent, HeroBiosAndContactsComponent, HeroBioComponent,
    HeroesBaseComponent, SortedHeroesComponent,
    HeroOfTheMonthComponent, HeroContactComponent,
    HighlightDirective,
    ParentFinderComponent,
];

const componentListA = [ AliceComponent, AlexComponent ];

const componentListB = [ BarryComponent, BethComponent, BobComponent ];

const componentListC = [
  CarolComponent, ChrisComponent, CraigComponent,
  CathyComponent
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(HeroData)
    // AppRoutingModule TODO: add routes
  ],
  declarations: [
    declarations,
    componentListA,
    componentListB,
    componentListC,
    StorageComponent,
  ],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppModule { }
