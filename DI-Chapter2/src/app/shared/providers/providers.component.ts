/*
 * A collection of demo components showing different ways to provide services
 * in @Component metadata
 */
import { Component, Inject, Injectable, OnInit } from '@angular/core';

import {
  APP_CONFIG,
  AppConfig,
  HERO_DI_CONFIG } from './app.config';

import { HeroService } from '../../core/services/hero.service';
import { heroServiceProvider } from '../../core/services/hero.service.provider';
import { Logger } from '../../core/services/logger.service';
import { UserService } from '../../core/services/user.service';

const template = '{{log}}';
/**
 * - 의존성 프로바이더 (Dependency Providers)
 * 서비스 클래스를 프로바이더로 등록하는 방법 중 가장 간단한 방법은 클래스를 선언하면서 직접 프로바이더를 등록하는 것이다.
 * 이렇게 등록하면 서비스 클래스 이름을 바로 프로바이더 토큰으로 사용할 수 있으며, 인젝터가 new 키워드를 사용해서 서비스 클래스의 인스턴스를 생성한다.
 */
@Component({
  selector: 'provider-1',
  template,
  // 클래스를 바로 프로바이더 배열에 등록하는 문법은 Provider 인터페이스에 정의된 문법을 짧게 줄인 것이다.
  // Logger 클래스를 직접 프로바이더에 등록한다.
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

/**
 * - Provider 객체 리터럴
 * 클래스를 바로 프로바이더 배열에 등록하는 문법을 줄이지 않고 풀어서 등록할 수도 있다.
 * 풀어서 사용할 경우, 프로퍼티 2개로 구성된 객체 리터럴을 사용한다.
 * - provide 프로퍼티에는 토큰을 지정
 * - 인젝터가 의존성 객체의 인스턴스를 생성하는 방법은 두번째 프로퍼티로 지정
 * - 클래스를 직접 인젝터에 등록하는 경우에는 useClass를 사용하며, 상황에 따라 useExisting, useValue, useFactory를 사용하는 경우도 있다.
 */
@Component({
  selector: 'provider-3',
  template,
  providers:
    // providers: [Logger] 와 같다
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

/**
 * - 대체 클래스 프로바이더
 * 서비스 클래스 프로바이더에는 다른 클래스를 등록할 수 있다. 
 * 그래서 인젝터가 Logger 토큰으로 의존성 객체를 요청받았을 때 BetterLogger 인스턴스를 제공하도록 설정할 수 있다.
 */
@Component({
  selector: 'provider-4',
  template,
  providers:
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

/**
 * - 추가 의존성이 있는 클래스의 프로바이더
 * useClass 프로바이더-정의(provider-definition) 키를 사용하면 어떤 클래스의 프로바이더를 다른 클래스로 지정할 수 있다.
 */
@Component({
  selector: 'provider-5',
  template,
  providers:
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

/**
 * - 별칭(aliased) 클래스 프로바이더
 * 프로바이더에 useClass 를 사용하면 OldLogger 를 NewLogger 로 대체하는것이 아니라 NewLogger 인스턴스를 두 개로 나누는 방식으로 등록된다.
 */
@Component({
  selector: 'provider-6a',
  template,
  providers:
    [ NewLogger,
      // 별칭으로 지정한 것이 아닙니다! `NewLogger`의 인스턴스는 2개 생성됩니다.
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

/**
 * - 별칭(aliased) 클래스 프로바이더
 * NewLogger 의 인스턴스를 하나로 유지하려면 OldLogger 토큰에 useExisting 옵션을 사용해야한다.
 */
@Component({
  selector: 'provider-6b',
  template,
  providers:
    [ NewLogger,
      // OldLogger는 NewLogger를 가리키는 이름으로 지정됩니다.
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

export const SilentLogger = {
  logs: ['Silent logger says "Shhhhh!". Provided via "useValue"'],
  log: silentLoggerFn
};

/**
 * - 값(value) 프로바이더
 * 의존성 객체는 클래스의 인스턴스를 만들어 제공하는 대신 미리 만들어둔 객체를 제공하는것이 더 간단할 때도 있다.
 * 객체를 프로바이더로 등록하려면 useValue 옵션을 사용한다.
 */
@Component({
  selector: 'provider-7',
  template,
  providers:
    // 객체를 프로바이더로 등록하려면 useValue 옵션을 사용한다.
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

/**
 * 
 */
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

/**
 * - 클래스가 아닌 의존성 객체
 * 의존성 객체가 반드시 클래스 타입은 아니다. 문자열이나 함수, 객체도 의존성으로 주입될 수 있다.
 * TypeScript 인터페이스는 토큰으로 사용할 수 없다.
 * 객체를 프로바이더로 등록하는 방식은 AppModule 과 같은 NgModule 에서 사용할 수 있다.
 */
@Component({
  selector: 'provider-9',
  template,
  /*
   // 에러! 인터페이스는 프로바이더 토큰으로 사용할 수 없습니다.
   [{ provide: AppConfig, useValue: HERO_DI_CONFIG })]
   */
  providers: [{ provide: APP_CONFIG, useValue: HERO_DI_CONFIG }]
})
export class Provider9Component implements OnInit {
  log: string;
  /*
   // 에러! 인자의 타입으로 인터페이스를 지정하면 의존성 주입이 동작하지 않습니다.
   constructor(private config: AppConfig){ }
   */
  // InjectionToken 으로 정의한 객체를 @Inject() 인자 데코레이터를 사용하여 주입할 수 있다.
  constructor(@Inject(APP_CONFIG) private config: AppConfig) { }

  ngOnInit() {
     this.log = 'APP_CONFIG Application title is ' + this.config.title;
  }
}

//////////////////////////////////////////
// Sample providers 1 to 7 illustrate a required logger dependency.
// Optional logger, can be null
import { Optional } from '@angular/core';

const someMessage = 'Hello from the injected logger';

/**
 * 
 */
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
