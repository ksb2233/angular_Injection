import { Component, forwardRef, Optional, SkipSelf } from '@angular/core';

export abstract class Parent { name: string; }
export abstract class Base { name = 'Count Basie'; }

@Component({
  selector: 'alex',
  template: `
      <h3>{{name}}</h3>
      <cathy></cathy>
      <craig></craig>
      <carol></carol>`,
  // forwardRef() 를 사용하면 의존성 객체에 대한 참조를 간접 참조로 만들면서 클래스를 생성하고, 이 의존성 객체를 나중에 처리할 수 있다.
  providers: [{ provide: Parent, useExisting: forwardRef(() => AlexComponent) }],
  // providers: [{ provide: Parent, useExisting: AlexComponent }],
})
export class AlexComponent extends Base
{
  name = 'Alex';
}

@Component({
  selector: 'cathy',
  template: `
    <h3>Cathy</h3>
    {{alex ? 'Found' : 'Did not find'}} Alex via the component class.`
})
export class CathyComponent {
  constructor( @Optional() public alex?: AlexComponent ) { }
}

@Component({
  selector: 'craig',
  template: `
    <h3>Craig</h3>
    {{alex ? 'Found' : 'Did not find'}} Alex via the base class.`
})
export class CraigComponent {
  constructor( @Optional() public alex?: Base ) { }
}

@Component({
  selector: 'carol',
  template: `
    <h3>{{name}}</h3>
    <p>My parent is {{parent?.name}}</p>`
})
export class CarolComponent {
  name = 'Carol';
  constructor( @Optional() public parent?: Parent ) { }
}