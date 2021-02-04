import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from './layout/layout.module';
import { HighlightDirective } from './highlight.directive';

@NgModule({
  declarations: [
    HighlightDirective
  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [
    HighlightDirective,
    LayoutModule
  ]
})
export class SharedModule { }
