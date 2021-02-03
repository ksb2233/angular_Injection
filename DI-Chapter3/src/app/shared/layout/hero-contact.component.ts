import { Component, Host, Optional } from '@angular/core';

import { HeroCacheService } from '../../core/services/hero-cache.service';
import { LoggerService } from '../../core/services/logger.service';

/**
 * - 생략해도 되는 @Optional, 탐색 범위를 제한하는 @Host
 * 생성자인자에 사용된 @Host() 함수는 이 인자를 의존성으로 찾을 때 부모 컴포넌트까지만 찾도록 탐색 범위를 제한하는 데코레이터다.
 * 부모 컴포넌트보다 상위에 등록되어 있더라도 부모 컴포넌트에서 찾지 못할 경우 에러가 발생한다.
 * 의존성 객체를 찾는 과정이 AppComoponent 계층까지 버블링되는 현상을 막을 수 있다.
 * 
 * @Optional() 함수는 의존성 객체의 인스턴스를 찾지 못하더라도 에러가 발생하지 않으며 생성자에 null 이 주입된다.
 */
@Component({
  selector: 'app-hero-contact',
  template: `
  <div>Phone #: {{phoneNumber}}
  <span *ngIf="hasLogger">!!!</span></div>`
})
export class HeroContactComponent {

  hasLogger = false;

  constructor(
      // HeroCacheService 인스턴스 탐색 범위를 호스트 컴포넌트까지로 제한합니다.
      @Host()
      private heroCache: HeroCacheService,

      // LoggerService 인스턴스 탐색 범위를 호스트 컴포넌트까지로 제한합니다.
      @Host()
      // 인스턴스가 존재하지 않아도 에러가 발생하지 않습니다. 제거하면 에러 발생
      @Optional()
      private loggerService?: LoggerService
  ) {
    if (loggerService) {
      this.hasLogger = true;
      loggerService.logInfo('HeroContactComponent can log!');
    }
  }

  get phoneNumber() { return this.heroCache.hero.phone; }

}
