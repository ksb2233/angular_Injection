import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { 
  AlexComponent, 
  CathyComponent,
  CraigComponent,
  CarolComponent
} from './forward-ref/forward-ref.component';


@NgModule({
  declarations: [
    AppComponent,
    AlexComponent,
    CathyComponent,
    CraigComponent,
    CarolComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
