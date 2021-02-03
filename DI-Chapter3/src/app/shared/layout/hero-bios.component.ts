import { Component } from '@angular/core';

import { HeroService } from '../../core/services/hero.service';
import { LoggerService } from '../../core/services/logger.service';

@Component({
  selector: 'app-hero-bios',
  template: `
    <app-hero-bio [heroId]="1"></app-hero-bio>
    <app-hero-bio [heroId]="2"></app-hero-bio>
    <app-hero-bio [heroId]="3"></app-hero-bio>`,
  providers: [HeroService]
})
export class HeroBiosComponent {
  // Angular는 인젝터에 LoggerService에 해당하는 서비스가 있는지 확인하고, 인젝터가 반환하는 객체를 logger 프로퍼티에 할당한다.
  constructor(logger: LoggerService) {
    logger.logInfo('Creating HeroBiosComponent');
  }
}

@Component({
  selector: 'app-hero-bios-and-contacts',
  template: `
    <app-hero-bio [heroId]="1"> <app-hero-contact></app-hero-contact> </app-hero-bio>
    <app-hero-bio [heroId]="2"> <app-hero-contact></app-hero-contact> </app-hero-bio>
    <app-hero-bio [heroId]="3"> <app-hero-contact></app-hero-contact> </app-hero-bio>`,
  providers: [HeroService]
})
export class HeroBiosAndContactsComponent {
  constructor(logger: LoggerService) {
    logger.logInfo('Creating HeroBiosAndContactsComponent');
  }
}
