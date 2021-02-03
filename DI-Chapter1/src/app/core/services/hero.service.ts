import { Injectable } from '@angular/core';
import { Optional } from '@angular/core';
import { Logger } from './logger.service';
import { HEROES } from '../models/mock-heroes';

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

   /**
   * @Optional() 데코레이터를 사용하면 의존성 객체를 생략할 수 있다고 지정할 수 있다.
   * 하지만 주입되는 객체의 인스턴스가 null 인 경우도 고려해야한다.
   * Logger 서비스가 어디에도 등록되어 있지 않으면 logger 프로퍼티에 null 값이 할당 된다.
   */
  // Logger 의존성 주입
  constructor(@Optional() private logger?: Logger) {
    if (this.logger) {
      logger.log('message');
    }
   }


  getHeroes() {
    this.logger.log('Getting heroes ...');
    return HEROES;
  }
}
