/* tslint:disable:one-line*/
import { InjectionToken } from '@angular/core';

export const TITLE = new InjectionToken<string>('title');

import { Component, Inject } from '@angular/core';

import { DateLoggerService } from '../../core/services/date-logger.service';
import { Hero } from '../../core/models/hero';
import { HeroService } from '../../core/services/hero.service';
import { LoggerService } from '../../core/services/logger.service';
import { MinimalLogger } from '../../core/services/minimal-logger.service';
import { RUNNERS_UP,
         runnersUpFactory } from '../runners-up';

const someHero = new Hero(42, 'Magma', 'Had a great month!', '555-555-5555');

/**
 * 의존성 토큰에 프로바이더를 연결할 때는 useValue, useClass, useExisting, useFactory를 사용할 수 있다.
 * - useValue     : 고정된 값을 의존성 토큰에 연결할 수 있다. 웹사이트의 기본 주소나 플래그 값 등 실행시점에 결정되는 상수를 의존성으로 주입할 때 사용
 * - useClass     : 이 키에 연결된 클래스 인스턴스가 대신 주입된다. 어떤 클래스를 다른 구현체로 대체할 때 사용할 수 있다
 * - useExisting  : 어떤 토큰을 다른 토큰과 연결할 때 사용한다. provide 에 사용된 토큰은 useExisting 에 사용된 토큰의 별칭(alias) 역할을 하기때문에, 결국 같은 서비스 객체를 또 다른 이름으로 참조할 수 있다.
 * - useFactory   : 팩토리함수가 실행되면서 반환한 객체를 의존성으로 등록할 수 있다.
 */
@Component({
  selector: 'app-hero-of-the-month',
  templateUrl: './hero-of-the-month.component.html',
  providers: [
    { provide: Hero,          useValue:    someHero },
    { provide: TITLE,         useValue:   'Hero of the Month' }, // 의존성 객체는 Date 객체나 숫자, 문자열 뿐 아니라 배열이나 함수가 될 수도 있다.
    { provide: HeroService,   useClass:    HeroService },
    { provide: LoggerService, useClass:    DateLoggerService },
    { provide: MinimalLogger, useExisting: LoggerService },
    { provide: RUNNERS_UP,    useFactory:  runnersUpFactory(2), deps: [Hero, HeroService] }
  ]
})
export class HeroOfTheMonthComponent {
  logs: string[] = [];

  constructor(
      logger: MinimalLogger,
      // logger2: LoggerService,
      public heroOfTheMonth: Hero,
      @Inject(RUNNERS_UP) public runnersUp: string,
      @Inject(TITLE) public title: string)
  {
    this.logs = logger.logs;
    // logs 와 logInfo 만 보이게 된다. logger.logs, logger.logInfo
    logger.logInfo('starting up');
    // logger2.logDebug('starting up');
    // logger2.logError('starting up');
    // logger2.logInfo('starting up');
    // logger2.logs;
  }
}
