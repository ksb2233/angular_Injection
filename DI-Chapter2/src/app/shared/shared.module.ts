import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroListComponent } from './hero-list/hero-list.component';
import { ProvidersModule } from './providers/providers.module';



@NgModule({
  declarations: [
    HeroListComponent
  ],
  imports: [
    CommonModule,
    ProvidersModule
  ],
  exports: [
    HeroListComponent,
    ProvidersModule
  ]
})
export class SharedModule { }
