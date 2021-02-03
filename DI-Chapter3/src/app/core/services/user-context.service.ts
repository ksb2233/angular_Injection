import { Injectable } from '@angular/core';

import { LoggerService } from './logger.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {
  name: string;
  role: string;
  loggedInSince: Date;

  /**
   * - 중첩된 서비스 의존성
   * LoggerService 의 인스턴스는 AppComponent 에서 이미 생성했기 때문에 이전에 만들어진 인스턴스를 다시 활용한다.
   */
  // UserContextService 의 생성자가 LoggerService 와 UserService 의 의존성 주입 요청
  constructor(private userService: UserService, private loggerService: LoggerService) {
    this.loggedInSince = new Date();
  }

  loadUser(userId: number) {
    const user = this.userService.getUserById(userId);
    this.name = user.name;
    this.role = user.role;

    this.loggerService.logDebug('loaded User');
  }
}
