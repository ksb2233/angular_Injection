import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { HEROES } from '../models/mock-heroes';
import { UserService } from './user.service';

/**
 * 팩토리 프로바이더는 의존성 주입을 제공하지 않는 서드파티 라이브러리에 의존성 주입 시스템을 적용하는 용도로 사용할 수 있다.
 * 팩토리 프로바이더는 팩토리 함수를 사용한다.
 */
@Injectable({
  providedIn: 'root',
  // 서비스 프로바이더를 등록할 때 useFactory 필드를 사용하면 이 의존성 객체는 지정한 팩토리함수가 사용된다는 것을 의미한다.
  useFactory: (logger: Logger, userService: UserService) =>
      new HeroService(logger, userService.user.isAuthorized),
  // 팩토리 함수에 필요한 프로바이더 토큰은 deps 프로퍼티로 지정한다.
  deps: [Logger, UserService],
})

// 팩토리 프로바이더는 변수에 할당하고 파일 외부로 공개(export) 해야 이후에도 재사용 할 수 있다.
export class HeroService {

  constructor(
    private logger: Logger,
    private isAuthorized: boolean
    ) { }

  getHeroes() {
    const auth = this.isAuthorized ? 'authorized ' : 'unauthorized';
    this.logger.log(`Getting heroes for ${auth} user.`);
    return HEROES.filter(hero => this.isAuthorized || !hero.isSecret);
  }
}
