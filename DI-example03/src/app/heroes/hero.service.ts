import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Logger } from '../logger.service';
import { UserService } from '../user.service';

/**
 * 트리 셰이킹은 애플리케이션에 사용되지 않은 코드를 최종 번들링 결과물에 포함시키지 않는 기능을 의미한다.
 * Angular 컴파일러는 트리 셰이킹될 수 있도록 등록된 프로바이더에만 트리 세이킹을 적용할 수 있다.
 * 이 과정을 통해 불필요한 코드를 제거하면 최종 빌드 결과물의 용량을 줄일 수 있다.
 */
// injectable() 데코레이터로 직접 등록하면 트리 셰이킹 대상으로 지정할 수 있다.
@Injectable({
  providedIn: 'root',
  useFactory: (logger: Logger, userService: UserService) =>
      new HeroService(logger, userService.user.isAuthorized),
  deps: [Logger, UserService],
})
export class HeroService {
  /**
   * HeroService 의 생성자에 boolean 플래그를 사용해서 비밀 히어로 명단을 화면에 표시할지, 표시ㅏ지 않을지 결정
   */
  constructor(
    private logger: Logger,
    private isAuthorized: boolean) { }

  getHeroes() {
    const auth = this.isAuthorized ? 'authorized ' : 'unauthorized';
    this.logger.log(`Getting heroes for ${auth} user.`);
    return HEROES.filter(hero => this.isAuthorized || !hero.isSecret);
  }
}
