import { AppConfig } from './app-config';
export { AppConfig } from './app-config';

import { InjectionToken } from '@angular/core';


// 클래스가 아닌 의존성 객체는 InjectionToken 객체를 정의하는 방법으로도 프로바이더를 등록할 수 있다.
// InjectionToken 정의
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const HERO_DI_CONFIG: AppConfig = {
  apiEndpoint: 'api.heroes.com',
  title: 'Dependency Injection'
};
