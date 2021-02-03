
import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Logger } from '../logger.service';

/**
 * 서비스는 인젝터의 범위 안에서 싱글턴으로 존재,
 * 인젝터에 존재하는 서비스의 인스턴스는 언제나 하나다.
 * root 나 AppModule 계층에 서비스를 드으록한다는 것은 서비스 프로바이더를 최상위 인젝터에 등록한다는 의미
 */
// 해당 서비스를 앱의 최상이 인젝터에 등록
@Injectable({
  providedIn: 'root',
})
export class HeroService {

  // Logger 의존성 주입
  constructor(private logger: Logger) {  }

  getHeroes() {
    this.logger.log('Getting heroes ...');
    return HEROES;
  }
}
