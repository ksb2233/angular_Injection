
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    ParentFinderComponent,
    AlexComponent,
    AliceComponent,
    CarolComponent,
    ChrisComponent,
    CraigComponent,
    CathyComponent,
    BarryComponent,
    BethComponent,
    BobComponent
} from './';

const componentListA = [ AliceComponent, AlexComponent ];
const componentListB = [ BarryComponent, BethComponent, BobComponent ];
const componentListC = [ CarolComponent, ChrisComponent, CraigComponent, CathyComponent ];

import {
    HeroBiosComponent,
    HeroBiosAndContactsComponent,
    HeroBioComponent,
    HeroesBaseComponent,
    SortedHeroesComponent,
    HeroOfTheMonthComponent,
    HeroContactComponent,
    StorageComponent
} from './';
import { FormsModule } from '@angular/forms';

const declarations = [
    HeroBiosComponent,
    HeroBiosAndContactsComponent,
    HeroBioComponent,
    HeroesBaseComponent,
    SortedHeroesComponent,
    HeroOfTheMonthComponent,
    HeroContactComponent,
    ParentFinderComponent,
];


@NgModule({
  declarations: [
    declarations,
    componentListA,
    componentListB,
    componentListC,
    StorageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    declarations,
    componentListA,
    componentListB,
    componentListC,
    StorageComponent
  ]
})
export class LayoutModule { }
