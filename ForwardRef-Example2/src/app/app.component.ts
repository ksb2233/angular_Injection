import { Component, Injectable, forwardRef } from '@angular/core';

export class ClassCL { value; }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [{provide: ClassCL, useClass: forwardRef(() => ForwardRefS)}]
})
export class AppComponent {
  text;

  constructor( myClass: ClassCL){
    this.text = myClass.value;
  }
}

Injectable()
export class ForwardRefS { value = 'forwardRef work!' }