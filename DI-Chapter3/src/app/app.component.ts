import { Component } from '@angular/core';

import { LoggerService } from './core/services/logger.service';
import { UserContextService } from './core/services/user-context.service';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  private userId = 1;

  // AppComponent 의 생성자가 LoggerService 와 UserContext 의 의존성 주입 요청
  constructor(logger: LoggerService, public userContext: UserContextService) {
    userContext.loadUser(this.userId);
    logger.logInfo('AppComponent initialized');
  }
}
