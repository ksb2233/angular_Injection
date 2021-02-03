import { Component, Host, Optional } from '@angular/core';

import { HeroCacheService } from './hero-cache.service';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-hero-contact',
  template: `
  <div>Phone #: {{phoneNumber}}
  <span *ngIf="hasLogger">!!!</span></div>`
})
export class HeroContactComponent {

  hasLogger = false;

  constructor(
      @Host() // HeroCacheService 인스턴스 탐색 범위를 호스트 컴포넌트까지로 제한합니다.
      private heroCache: HeroCacheService,

      @Host()     // LoggerService 인스턴스 탐색 범위를 호스트 컴포넌트까지로 제한합니다.
      @Optional() // 인스턴스가 존재하지 않아도 에러가 발생하지 않습니다.
      private loggerService?: LoggerService
  ) {
    if (loggerService) {
      this.hasLogger = true;
      loggerService.logInfo('HeroContactComponent can log!');
    }
  }

  get phoneNumber() { return this.heroCache.hero.phone; }

}
