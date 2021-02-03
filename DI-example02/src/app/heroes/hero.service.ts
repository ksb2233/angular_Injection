
import { Injectable } from '@angular/core';
import { Optional } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Logger } from '../logger.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  /**
   * @Optional() 데코레이터를 사용하면 의존성 객체를 생략할 수 있다고 지정할 수 있다.
   * 하지만 주입되는 객체의 인스턴스가 null 인 경우도 고려해야한다.
   * Logger 서비스가 어디에도 들고되어 있지 않으면 logger 프로퍼티에 null 값이 할당 된다.
   */
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
