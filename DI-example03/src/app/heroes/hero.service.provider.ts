/* tslint:disable:one-line */
import { HeroService } from './hero.service';
import { Logger } from '../logger.service';
import { UserService } from '../user.service';

const heroServiceFactory = (logger: Logger, userService: UserService) => {
  return new HeroService(logger, userService.user.isAuthorized);
};
/**
 * Logger 와 UserService 클래스가 각각 클래스 프로바이더 토큰으로 사용되었다.
 * 이 토큰들은 인젝터가 확인한 후에 각 토큰에 매칭되는 서비스 인스턴스로 팩토리 함수의 인자에 주입된다.
 */

/*
HeroService는 UserService에 직접 접근할 수 없지만, 팩토리 함수는 접근할 수 있다.
 - 서비스 프로바이더를 등록할 때 useFactory 필드를 사용하면 이 의존성 객체는 지정한 팩토리함수가 사용된다는 것을 의미한다.
 - 팩토리 함수에 필요한 프로바이더 토큰은 deps 프로퍼티로 지정한다.

 팩토리 프로바이더는 변수에 할당하고 파일 외부로 export 해야 재사용이 가능하다.
*/
export let heroServiceProvider =
  { provide: HeroService,
    useFactory: heroServiceFactory,
    deps: [Logger, UserService]
  };
