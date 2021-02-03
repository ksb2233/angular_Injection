/*

import { Component, Inject, Injectable, OnInit } from '@angular/core';

import {
  APP_CONFIG,
  AppConfig,
  HERO_DI_CONFIG } from './app.config';

import { HeroService } from './heroes/hero.service';
import { heroServiceProvider } from './heroes/hero.service.provider';
import { Logger } from './logger.service';
import { UserService } from './user.service';

const template = '{{log}}';

@Component({
  selector: 'provider-1',
  template,
  // Logger 클래스를 직접 프로바이더에 등록
  providers: [Logger]
})
export class Provider1Component {
  log: string;
  constructor(logger: Logger) {
    logger.log('Hello from logger provided with Logger class');
    this.log = logger.logs[0];
  }
}

//////////////////////////////////////////

@Component({
  selector: 'provider-3',
  template,
  // 클래스 프로바이더를 풀어쓰는 방식으로 등록
  providers:
    // provide 프로퍼티에는 토큰을 지정
    // 인젝터가 의존성 객체의 인스턴스를 생성하는 방법은 두번째 프로퍼티로 지정
    // 클래스를 직접 인젝터에 등록하는 경우에는 useClass를 사용
    [{ provide: Logger, useClass: Logger }]
})
export class Provider3Component {
  log: string;
  constructor(logger: Logger) {
    logger.log('Hello from logger provided with useClass:Logger');
    this.log = logger.logs[0];
  }
}

//////////////////////////////////////////
export class BetterLogger extends Logger {}

@Component({
  selector: 'provider-4',
  template,
  providers:
    // 서비스 클래스 프로바이더에는 다른 클래스를 등록
    // 인젝터가 Logger 토큰으로 의존성 객체를 요청받았을 때 BetterLogger 인스턴스를 제공
    [{ provide: Logger, useClass: BetterLogger }]
})
export class Provider4Component {
  log: string;
  constructor(logger: Logger) {
    logger.log('Hello from logger provided with useClass:BetterLogger');
    this.log = logger.logs[0];
  }
}

//////////////////////////////////////////

@Injectable()
export class EvenBetterLogger extends Logger {
  constructor(private userService: UserService) { super(); }

  log(message: string) {
    const name = this.userService.user.name;
    super.log(`Message to ${name}: ${message}`);
  }
}

@Component({
  selector: 'provider-5',
  template,
  providers:
    // EvenBetterLogger 는 로그를 출력할 때 사용자의 이름도 함께 출력하는 클래스
    // 출력하는 상ㅇ자의 이름은 UserService 에서 주입받아서 참조한다.
    // useClass 프로바이더-정의(provider-deifnition) 키를 사용하면 어떤 클래스의 프로바이더를 다른 클래스로 지정할 수있다.
    [ UserService,
      { provide: Logger, useClass: EvenBetterLogger }]
})
export class Provider5Component {
  log: string;
  constructor(logger: Logger) {
    logger.log('Hello from EvenBetterlogger');
    this.log = logger.logs[0];
  }
}

//////////////////////////////////////////

export class NewLogger extends Logger {}

export class OldLogger {
  logs: string[] = [];
  log(message: string) {
    throw new Error('Should not call the old logger!');
  }
}

@Component({
  selector: 'provider-6a',
  template,
  providers:
    // 프로바이더에 useClass 를 사용하면 OldLogger를 NewLogger로 대체하는 것이 아니라 NewLogger 인스턴스를 두 개로 나누는 방식으로 등록
    [ NewLogger,
      { provide: OldLogger, useClass: NewLogger}]
})
export class Provider6aComponent {
  log: string;
  constructor(newLogger: NewLogger, oldLogger: OldLogger) {
    if (newLogger === oldLogger) {
      throw new Error('expected the two loggers to be different instances');
    }
    oldLogger.log('Hello OldLogger (but we want NewLogger)');
    // The newLogger wasn't called so no logs[]
    // display the logs of the oldLogger.
    this.log = newLogger.logs[0] || oldLogger.logs[0];
  }
}

@Component({
  selector: 'provider-6b',
  template,
  providers:
    // NewLogger의 인스턴스를 하나로 유지하려면 oldLogger 토큰에 useExisting 옵션을 사용
    [ NewLogger,
      // OldLogger는 NewLogger를 가리키는 이름으로 지정
      { provide: OldLogger, useExisting: NewLogger}]
})
export class Provider6bComponent {
  log: string;
  constructor(newLogger: NewLogger, oldLogger: OldLogger) {
    if (newLogger !== oldLogger) {
      throw new Error('expected the two loggers to be the same instance');
    }
    oldLogger.log('Hello from NewLogger (via aliased OldLogger)');
    this.log = newLogger.logs[0];
  }
}

//////////////////////////////////////////

// Logger 서비스와 모양이 같은 객체
function silentLoggerFn() {}

// 미리 만들어둔 객체를 제공하는 경우도 있다.
// 객체를 프로바이더로 등록하려면 useValue 옵션을 사용한다.
export const SilentLogger = {
  logs: ['Silent logger says "Shhhhh!". Provided via "useValue"'],
  log: silentLoggerFn
};

@Component({
  selector: 'provider-7',
  template,
  providers:
    // 객체를 Logger 토큰에 등록하려면 useValue 옵션을 사용하면 된다.
    [{ provide: Logger, useValue: SilentLogger }]
})
export class Provider7Component {
  log: string;
  constructor(logger: Logger) {
    logger.log('Hello from logger provided with useValue');
    this.log = logger.logs[0];
  }
}

/////////////////

@Component({
  selector: 'provider-8',
  template,
  providers: [heroServiceProvider, Logger, UserService]
})
export class Provider8Component {
  // must be true else this component would have blown up at runtime
  log = 'Hero service injected successfully via heroServiceProvider';

  constructor(heroService: HeroService) { }
}

/////////////////

// 객체가 반드시 클래스 타입이어야하는것은 아니다.
@Component({
  selector: 'provider-9',
  template,
   // 에러! 인터페이스는 프로바이더 토큰으로 사용할 수 없습니다.
  //  [{ provide: AppConfig, useValue: HERO_DI_CONFIG })]
  providers: [{ provide: APP_CONFIG, useValue: HERO_DI_CONFIG }]
})
export class Provider9Component implements OnInit {
  log: string;

  // constructor(@Inject(APP_CONFIG) private config: AppConfig) { }

  ngOnInit() {
     this.log = 'APP_CONFIG Application title is ' + this.config.title;
  }
}

//////////////////////////////////////////
// Sample providers 1 to 7 illustrate a required logger dependency.
// Optional logger, can be null
import { Optional } from '@angular/core';

const someMessage = 'Hello from the injected logger';

@Component({
  selector: 'provider-10',
  template,
  providers: [{ provide: Logger, useValue: null }]
})
export class Provider10Component implements OnInit {
  log: string;
  constructor(@Optional() private logger?: Logger) {
    if (this.logger) {
      this.logger.log(someMessage);
    }
  }

  ngOnInit() {
    this.log = this.logger ? this.logger.logs[0] : 'Optional logger was not available';
  }
}

/////////////////

@Component({
  selector: 'app-providers',
  template: `
  <h2>Provider variations</h2>
  <div id="p1"><provider-1></provider-1></div>
  <div id="p3"><provider-3></provider-3></div>
  <div id="p4"><provider-4></provider-4></div>
  <div id="p5"><provider-5></provider-5></div>
  <div id="p6a"><provider-6a></provider-6a></div>
  <div id="p6b"><provider-6b></provider-6b></div>
  <div id="p7"><provider-7></provider-7></div>
  <div id="p8"><provider-8></provider-8></div>
  <div id="p9"><provider-9></provider-9></div>
  <div id="p10"><provider-10></provider-10></div>
  `
})
export class ProvidersComponent { }
 */
