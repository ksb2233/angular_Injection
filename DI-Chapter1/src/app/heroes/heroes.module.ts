import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesComponent } from './heroes.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeroesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HeroesComponent
  ]
})
export class HeroesModule { }
